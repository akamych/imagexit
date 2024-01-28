const CACHE_NAME = 'app-cache-v1';
const URLS = [
    '/',
    '/assets/images/cards/1.jpeg',
    '/assets/images/cards/2.jpeg',
    '/assets/images/cards/3.jpeg',
    '/assets/images/cards/4.jpeg',
    '/assets/images/cards/5.jpeg',
    '/assets/images/cards/6.jpeg',
    '/src/main.tsx',
    '/src/index.css',
    '/src/App.tsx',
    '/src/App.css'
];

self.addEventListener('install', async event => {
    console.log('install');
    try{
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(URLS);
    }catch (err){
        console.error(err); 
        throw err;
    }
    
});

self.addEventListener('activate', event => console.log('activate')); 

self.addEventListener('fetch', event => {
    console.log('Fetch: ', event.request.url)
    event.respondWith(cacheFirst(event.request))
}); 

async function cacheFirst(request){
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
}