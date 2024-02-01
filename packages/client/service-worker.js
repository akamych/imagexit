const CACHE_NAME = 'app-cache-v1';
const URLS = [
    '/',
    '/index.html',
    // '/assets/images/cards/1.jpeg',
    // '/assets/images/cards/2.jpeg',
    // '/assets/images/cards/3.jpeg',
    // '/assets/images/cards/4.jpeg',
    // '/assets/images/cards/5.jpeg',
    // '/assets/images/cards/6.jpeg',
    // '/assets/images/logo.png',
    // '/assets/images/mascot.png',
    // '/assets/images/mainbg.jpg',
];

self.addEventListener('install', async event => {
    console.log('install');
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS);
    } catch (err) {
        console.error(err);
        throw err;
    }
});

self.addEventListener('activate', () => console.log('activate'));

self.addEventListener('fetch', async event => {
    try {
        console.log('Fetch: ', event.request.url);
        // Check if the request is for an asset file in the /assets folder
        if (event.request.url.includes('/assets/')) {
            event.respondWith(handleAssetRequest(event.request));
        } else {
            event.respondWith(cacheFirst(event.request));
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
});

async function cacheFirst(request) {
    try {
        const cached = await caches.match(request);
        return cached || fetch(request);
    } catch (error) {
        console.error('Cache first error:', error);
        throw error;
    }
}

async function handleAssetRequest(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        let response = await cache.match(request);
        if (!response) {
            response = await fetch(request);
            await cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        console.error('Asset request error:', error);
        throw error;
    }
}
