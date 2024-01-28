const CACHE_NAME = 'app-cache-v1';
const URLS = [
    '/',
    '/public/assets/images/cards/1.jpeg',
    '/public/assets/images/cards/2.jpeg',
    '/public/assets/images/cards/3.jpeg',
    '/public/assets/images/cards/4.jpeg',
    '/public/assets/images/cards/5.jpeg',
    '/public/assets/images/cards/6.jpeg',
    '/src/main.tsx'
];

self.addEventListener('install', event => {
    console.log('install');
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            cache.addAll(URLS);
        })
        .catch(err => {
            console.error(err); 
            throw err;
        })
    )
});
self.addEventListener('activate', event => console.log('activate')); 
