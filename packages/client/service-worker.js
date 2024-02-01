const CACHE_NAME = 'app-cache-v1';
const URLS = [
    '/',
    // '/assets/images/cards/1.jpeg',
    // '/assets/images/cards/2.jpeg',
    // '/assets/images/cards/3.jpeg',
    // '/assets/images/cards/4.jpeg',
    // '/assets/images/cards/5.jpeg',
    // '/assets/images/cards/6.jpeg',
    '/index.html',
    // '/assets/images/logo.png',
    // '/assets/images/mascot.png',
    // '/assets/images/mainbg.jpg',
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

self.addEventListener('fetch', async event => {
    try{
        // Смотрим, если запрос на файл из папки /assets
        if (event.request.url.includes('/assets/')) {
            return handleAssetRequest(event.request);
        }
        // Для остальных запросов сначала смотрим в кэш
        cacheFirst(event.request);
    }catch(error){
        console.error('Fetch error:', error);
    }
}); 

async function cacheFirst(request){
    const cached = await caches.match(request);
    return cached ?? await fetch(request);
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
        console.error('Ошибка обрабоки запроса в /assets:', error);
    }
}