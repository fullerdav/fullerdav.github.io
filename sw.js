self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('noforce').then(function(cache) {
            return cache.addAll(['/', '/js/scaffolding.json', 'https://fonts.googleapis.com/css?family=Lato', 'https://fonts.googleapis.com/css?family=Merriweather', '/css/noforce.css', '/noforce.html', '/js/jquery-3.2.1.min.js', '/js/noforce.js', '/js/d3.v4.js']);
        })
    );
});
// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         }
//     ));
// });
