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
            } else {
                links[i].href = links[i].href + '?q=' + latLng + '(' + venueName + ')';
            }
        }
    }
})();