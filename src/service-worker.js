workbox.core.setCacheNameDetails({
  prefix: "vue-practice",
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

let open_url = "";
self.addEventListener("push", (event) => {
  const notification = JSON.parse(event.data.text()).notification;
  open_url = notification.open_url;
  event.waitUntil(
    self.registration.showNotification("My Notification", notification)
  );
});

self.addEventListener("notificationclick", (event) => {
  const clickedNotifications = event.notification;
  clickedNotifications.close();
  if (open_url) {
    const promisChain = clients.openWindow(open_url);
    event.waitUntil(promisChain);
  }
});

self.registration.pushManager.getSubscription().then((sub) => {
  console.log(sub);
  if (sub) {
    console.log(sub);
  } else {
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BBziSIuVY4aLHLgXuRbgYfy7v4JsM367L9LO4kbz2RhH3B3hMoI8FB_W3C2-RzBUoipgD-EhvlFPbQEr7tY8Q6w",
      })
      .then(async (subscription) => {
        mySubscription = subscription.toJSON();
        const endpoint = mySubscription.endpoint;
        console.log(endpoint, mySubscription);
      })
      .catch((err) => console.log(err));
  }
});
