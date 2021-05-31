// Use the web-push library to hide the implementation details of the communication
// between the application server and the push service.
// For details, see https://tools.ietf.org/html/draft-ietf-webpush-protocol and
// https://tools.ietf.org/html/draft-ietf-webpush-encryption.
const webPush = require('web-push');

if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    console.log("You must set the VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY " +
        "environment variables. You can use the following ones:");
    console.log(webPush.generateVAPIDKeys());
    return;
}
// Set the keys used for encrypting the push messages.
webPush.setVapidDetails(
    'https://serviceworke.rs/',
    'BHVDNALIPgWSL76zRJevtJ0GQybgXNRkTpfUR0DAV2PyscaNqMZMWcGOLXYmfMcTBd1D6bXFKFfF0iDJSU2gN-4',
    'sjq6eXdqPrBbot2uOSro50Xc_2YpLK4WpPUgcSLiv6o'
);

module.exports = function (app, route) {
    app.get(route + 'vapidPublicKey', function (req, res) {
        res.send('BHVDNALIPgWSL76zRJevtJ0GQybgXNRkTpfUR0DAV2PyscaNqMZMWcGOLXYmfMcTBd1D6bXFKFfF0iDJSU2gN-4');
    });

    app.post(route + 'register', function (req, res) {
        // A real world application would store the subscription info.
        res.sendStatus(201);
    });

    app.post(route + 'sendNotification', function (req, res) {
        const subscription = req.body.subscription;
        const payload = req.body.payload;
        const options = {
            TTL: req.body.ttl
        };

        setTimeout(function () {
            webPush.sendNotification(subscription, payload, options)
                .then(function () {
                    res.sendStatus(201);
                })
                .catch(function (error) {
                    console.log(error);
                    res.sendStatus(500);
                });
        }, req.body.delay * 1000);
    });
};