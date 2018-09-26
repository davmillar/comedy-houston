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