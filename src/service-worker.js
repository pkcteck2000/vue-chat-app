workbox.core.setCacheNameDetails({
    prefix: "vue-practice"
});

self.addEventListener('install', (event) => {
    self.skipWaiting();

});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

let open_url = '';
self.addEventListener('push', (event) => {
    const notification = JSON.parse(event.data.text()).notification
    open_url = notification.open_url
    event.waitUntil(
        self.registration.showNotification('My Notification', notification)
    )
});

self.addEventListener('notificationclick', (event) => {
    const clickedNotifications = event.notification;
    clickedNotifications.close()
    if (open_url) {
        const promisChain = clients.openWindow(open_url)
        event.waitUntil(promisChain)
    }
})

// subscription.unsubscribe().then(function (successful) {
//     console.log(successful);
// }).catch(function (e) {
//     console.log(e);
// })

self.registration.pushManager.getSubscription().then(subscription => {
    console.log('1 :: ', subscription);
    if (subscription) {
        console.log('2 :: ', subscription.toJSON());
        subscribeToNotification(subscription)

    } else {
        self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BBziSIuVY4aLHLgXuRbgYfy7v4JsM367L9LO4kbz2RhH3B3hMoI8FB_W3C2-RzBUoipgD-EhvlFPbQEr7tY8Q6w'
        }).then((subscription) => {
            console.log('3 :: ', subscription.toJSON);
            subscribeToNotification(subscription)
        }).catch(err => console.log(err))
    }
})

const subscribeToNotification = async (subscription) => {
    const mySubscription = subscription.toJSON()
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    await fetch("http://localhost:5000/subscribe", {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(mySubscription),
    }).then(res => console.log(res))
}