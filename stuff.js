var _trackInstalling = function (worker) {
      worker.addEventListener('statechange', function() {
        if (worker.state == 'installed') {
          _updateReady(worker);
        }
      });
    },

    _updateReady = function (worker) {
      var promptResponse = confirm('List has an update available. Want to reload it?');

      if (promptResponse) {
        console.log('New ServiceWorker skipping waiting.');
        worker.postMessage({action: 'skipWaiting'});
      }
    },

    _installServiceWorker = function () {
      window.addEventListener('load', function() {
        var nav = navigator;

        nav.serviceWorker.register('sw.js').then(function(registration) {
          if (!nav.serviceWorker.controller) {
            return;
          }

          if (registration.waiting) {
            _updateReady(registration.waiting);
            return;
          }

          if (registration.installing) {
            _trackInstalling(registration.installing);
            return;
          }

          registration.addEventListener('updatefound', function() {
            _trackInstalling(registration.installing);
          });
        })['catch'](function(err) {
          console.log('ServiceWorker registration failed: ', err);
        });

        var refreshing;

        nav.serviceWorker.addEventListener('controllerchange', function() {
          if (refreshing) return;
          window.location.reload();
          refreshing = true;
        });
      });
    };

if ('serviceWorker' in navigator) {
  _installServiceWorker();
}

(function () {
    var userAgent = navigator.userAgent.toString();
    var links = document.getElementsByTagName('a');
    var count = links.length;
    for (var i = 0; i < count; i++) {
        if (links[i].href.indexOf('geo:') > -1) {
            let latLng = links[i].href.substring(4);
            let address = links[i].dataset.address;
            if (userAgent.match(/iPad|iPhone|iPod/ig)) {
                links[i].href = 'maps:?q=' + address;
            } else if (userAgent.match(/android/ig)) {
                links[i].href = links[i].href + '?q=' + latLng + '(' + address + ')';
            } else {
                links[i].href = 'https://www.openstreetmap.org/search?query=' + address + '#map=14/' + latLng;
            }
        }
    }
})();
