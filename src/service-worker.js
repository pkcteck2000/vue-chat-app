workbox.core.setCacheNameDetails({
    prefix: "vue-practice"
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

let open_url = '';
self.addEventListener('push', (event) => {
    let push_message = event.data.text()
    open_url = 'https://www.google.com'
    const options = {
        body: push_message,
        icon: 'https://m.media-amazon.com/images/I/71oMHcNQ7aL._AC_SS450_.jpg',
        vibrate: [200, 100, 200, 100, 200, 100, 200],
        tag: 'vibration-sample'
    };
    event.waitUntil(
        self.registration.showNotification('My Notification', options)
    )
});

self.addEventListener('notificationclick', (event) => {
    const clickedNotifications = event.notification;
    clickedNotifications.close()
    if (open_url) {
        console.log(open_url);
        const promisChain = clients.openWindow(open_url)
        event.waitUntil(promisChain)
    }
})