/**const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/img/1__480_360.jpg',
    '/img/2__480_360.jpg',
    '/img/3__480_360.jpg',
    '/img/4__480_360.jpg',
    '/img/5__480_360.jpg',
    '/img/6__480_360.jpg',
    '/img/7__480_360.jpg',
    '/img/8__480_360.jpg',
    '/img/9__480_360.jpg',
    '/img/10__480_360.jpg'
];

self.addEventListener('install',function(e) {
    e.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll(cacheFiles);

        })

        );
});

self.addEventListener('fetch',function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response){
        if(response){
            console.log('Found',e.request,'in cache');
            return response;
        }
        else {
            console.log('Could not find',e.request,'in cache,FETCHING!');
            return fetch(e.request);
            .then(function(response){
                caches.open('v1').then(function(cache){
                    cache.put(e.request,response);
                })
                return response;
            })
            .catch(function(err){
            console.error(err);
            });
           }
        })
     );
}); **/
self.addEventListener('install', (event) => {
 event.waitUntil(
   caches.open('restaurant').then((cache) => {
     return cache.addAll([
       '/',
       '/index.html',
       '/restaurant.html',
       '/css/styles.css',
       '/js/dbhelper.js',
       '/js/main.js',
       '/js/restaurant_info.js',
       '/data/restaurants.json',
       '/img/',
       '/img/1.jpg',
       '/img/2.jpg',
       '/img/3.jpg',
       '/img/4.jpg',
       '/img/5.jpg',
       '/img/6.jpg',
       '/img/7.jpg',
       '/img/8.jpg',
       '/img/9.jpg',
       '/img/10.jpg',
     ]).then(() => {
      console.log('Finished caching all files!');
     }).catch((error) => {
      console.log(' error: ', error);
     })
   })
 );
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activated');
});

self.addEventListener('fetch', (event) => {

  if (event.request.url.indexOf('maps.googleapis.com') !== -1) return;

  event.respondWith(
    caches.open('restaurant').then((cache) => {
      return cache.match(event.request).then((response) => {
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
