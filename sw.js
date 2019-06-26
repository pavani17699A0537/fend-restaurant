// Installing serviceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('cache1').then(function(cache) {
      return cache.addAll([
        './',
			'./index.html',
			'./restaurant.html',
			'./serviceWorker.js',
			'./js/dbhelper.js',
			'./js/main.js',
			'./js/restaurant_info.js',
			'./css/styles.css',
			'./data/restaurants.json',
			'./img/1.jpg',
			'./img/2.jpg',
			'./img/3.jpg',
			'./img/4.jpg',
			'./img/5.jpg',
			'./img/6.jpg',
			'./img/7.jpg',
			'./img/8.jpg',
			'./img/9.jpg',
			'./img/10.jpg'
      ]);
    })
  );
});

// Fetch Event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('cache1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});


self.addEventListener('activate', function(event) {
  var cacheKeeplist = ['cache2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheKeeplist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
