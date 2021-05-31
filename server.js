const webpush = require('web-push');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));
const publicVapidKey = 'BBziSIuVY4aLHLgXuRbgYfy7v4JsM367L9LO4kbz2RhH3B3hMoI8FB_W3C2-RzBUoipgD-EhvlFPbQEr7tY8Q6w';
const privateVapidKey = 'oHfTLhPvj86VMz2gf-ZJ2c28GIRevokglDkqQ0SFFi4';
// webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

const sub = [{
    "endpoint": "https://fcm.googleapis.com/fcm/send/fy4rmFNq54Q:APA91bHzaj2jiCZgCFC-zr-K5oxRzfq2YaZC6dPvXlUtlNmE-Qvf1NezewxorNIPt3OIdZvITykvYc5Kx3S_U5Lf0zLQmkLWe4fK0_dsaCEshVI5XRNnkeV-p49FSpW7cW9coy2LVJbA",
    "expirationTime": null,
    "keys": {
        "p256dh": "BBAkKUSpfQKbuRFbK2uhQbm1o0gA4hi9eILLN_xxJCVYfrXgYh2DHATPF65mVfCg4VHPDorAgFT0BQFILUulXwk",
        "auth": "AI7aWVYBMxeMUfEOn9pZfQ"
    }
}, ]

app.get('/', (req, res) => {
    return res.status(201).json({
        response: 'Success'
    });
})

app.post('/subscribe', (req, res) => {
    console.log(req.body);
    const subscription = req.body
    const myPromise = new Promise(function (myResolve, myReject) {
        sub.forEach(s => {
            if (s.keys.auth === subscription.keys.auth) {
                myReject();
            }
        })
        myResolve()
    });

    myPromise.then(
        function () {
            sub.push(subscription)
            return res.status(201).json({
                response: 'Success'
            });
        },
        function () {
            return res.status(201).json({
                response: 'Already Exists'
            });
        }
    );
})

const payLoad = {
    notification: {
        body: 'Hello',
        icon: 'https://m.media-amazon.com/images/I/71oMHcNQ7aL._AC_SS450_.jpg',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        open_url: 'https://vue-practice-68b47.web.app'
    },
}


webpush.setVapidDetails('mailto:example@yourdomain.org', publicVapidKey, privateVapidKey);
setInterval(() => {
    sub.forEach(s => {
        webpush.sendNotification(
            s,
            JSON.stringify(payLoad)
        )
    })
}, 5000);

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});