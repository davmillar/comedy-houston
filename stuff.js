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
    if (userAgent.match(/iPad|iPhone|iPod/ig)) {
        for (var i = 0; i < count; i++) {
            if (links[i].href.indexOf('geo:') > -1) {
                let latLng = links[i].href.substring(4);
                let venueName = links[i].innerText.replace(/\s/g, '+');
                links[i].href = 'http://maps.apple.com/?daddr=' + venueName + '&near=' + latLng;
            }
        }
    }
})();
