const CACHE_NAME = 'app-cache-v1';
const URLS = [
    '/',
    '/index.html',
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
        if (cached) {
            return cached;
        }
        const response = await fetch(request);
        
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
        
        return response;
    } catch (error) {
        console.error('Cache first error:', error);
    }
}

async function handleAssetRequest(request) {
    try {
        const cache = await caches.open(CACHE_NAME);
        let response = await cache.match(request);
        if (!response) {
            response = await fetch(request);
            await cache.put(request, response.clone())
        }
        return response;
    } catch (error) {
        console.error('Asset request error:', error);
        throw error;
    }
}
