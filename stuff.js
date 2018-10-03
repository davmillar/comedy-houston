/*jshint esversion: 6 */
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