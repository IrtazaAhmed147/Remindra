// self.addEventListener('push', function (event) {
//     const options = {
//         body: event.data ? event.data.text() : 'Default notification body',
//         icon: 'icon.png',
//         badge: 'badge.png'
//     };
//     event.waitUntil(
//         self.registration.showNotification('Notification Title', options)
//     );
// });


/* sw.js */

self.addEventListener('install', event => {
  console.log('[Service Worker] Installed');
  self.skipWaiting(); // new SW turant activate ho
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activated');
  event.waitUntil(self.clients.claim()); // open tabs control kare
});


self.addEventListener('push', event => {
  console.log('[Service Worker] Push Received');

  let data = {};

  if (event.data) {
    data = event.data.json();
  }

  const title = data.title || 'New Notification';
  const options = {
    body: data.message || 'You have a new message',
    icon: '/logo192.png',      // optional
    badge: '/badge.png',       // optional
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',    // click par kaha open ho
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click Received');

  event.notification.close();

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === targetUrl && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
