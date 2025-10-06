self.addEventListener('install', (e) => {
    self.skipWaiting();
    console.log('Service Worker: Installed', e);
});

self.addEventListener('activate', (e) => {
    console.log('Activate', e);
});
