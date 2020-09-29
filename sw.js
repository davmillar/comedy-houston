// jshint esversion:6
var me = self,
    CACHE_NAME = 'dfwv3.69000001',
    urlsToCache = [
        '/',
        '/?utm_source=web_app_manifest',
        '/index.html',
        '/stuff.css',
        '/stuff.js',
        '/manifest.json',
        '/icon.svg',
        '/icon.png'
    ];

me.addEventListener('install', function(event) {
    event.waitUntil(precache());
});

me.addEventListener('fetch', function(event) {
    event.respondWith(fromNetwork(event.request, 400).catch(function () {
        return fromCache(event.request);
    }));
});

me.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

me.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
        me.skipWaiting();
    }
});

function precache() {
    return caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        });
}

function fromCache(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function fromNetwork(request, timeout) {
    return new Promise(function (fulfill, reject) {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request).then(function (response) {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function update(request) {
    return caches.open(CACHE_NAME).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}
