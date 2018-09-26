/*jshint esversion: 6 */
(function () {
    var userAgent = navigator.userAgent.toString();
    var links = document.getElementsByTagName('a');
    var count = links.length;
    for (var i = 0; i < count; i++) {
        if (links[i].href.indexOf('geo:') > -1) {
            let latLng = links[i].href.substring(4);
            let venueName = encodeURIComponent(links[i].innerText);
            if (userAgent.match(/iPad|iPhone|iPod/ig)) {
                links[i].href = 'http://maps.apple.com/?daddr=' + venueName + '&near=' + latLng;
            } else if (!userAgent.match(/android/ig)) {
                links[i].href = links[i].href + '?q=' + latLng + '(' + venueName + ')';
            } else {
                links[i].href = 'https://www.openstreetmap.org/search?query=' + venueName + '#map=14/' + latLng;
            }
        }
    }
})();