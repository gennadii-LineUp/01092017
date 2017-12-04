function initialize() {
    var map;
    // Array with all markers in map (for reset animation)
    var markersOnMap = [];
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // Marker image
    var image = {
        url: 'img/map-icon.png',
        // This marker is 32 pixels wide by 38 pixels high.
        size: new google.maps.Size(32, 38),
        // The origin for this image is (0, 0).
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at (0, 32).
        anchor: new google.maps.Point(16, 30)
    };

    // Multiple Markers
    var markers = [
        ['Elizabeth Swann', 51.503454,-0.119562],
        ['Jack Sparrow', 51.499633,-0.124755]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<a class="map_content" href="tel:11111111111">' +
            '<img src="img/user.png" alt="">' +
            '<div>' +
                '<h3>Elizabeth Swann</h3>' +
                '<p><i class="fa fa-phone" aria-hidden="true"></i>111 (111) 111-11</p>' +
            '</div>' +
        '</a>'],
        ['<a class="map_content" href="tel:22222222222">' +
            '<img src="img/jack.jpg" alt="">' +
            '<div>' +
                '<h3>Jack Sparrow Jack Sparrow</h3>' +
                '<p><i class="fa fa-phone" aria-hidden="true"></i>111 (222) 222-11</p>' +
            '</div>' +
        '</a>']
    ];

    // Display multiple markers on a map
    // Initialize offset for infoWindow
    var infoWindow = new google.maps.InfoWindow({
        pixelOffset: new google.maps.Size(130, 130)
    }), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            icon: image
        });
        // Save markers in array
        markersOnMap.push(marker);
        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                stopMarkerAnimation();
                // Start animation this marker
                marker.setAnimation(google.maps.Animation.BOUNCE);
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

    google.maps.event.addListener(infoWindow, 'domready', function() {
        var map = document.getElementById("map_canvas");
        // Finding infoWindow
        var iwOuter =  map.getElementsByClassName("gm-style-iw")[0];
        // Changing styles for parent window
        var iwParent = iwOuter.parentNode;
        iwParent.style.borderRadius = '25px';
        iwParent.style.maxWidth = '175px';
        // Hide clode button and arrow down
        var arrowDivBottom = iwOuter.previousSibling;
        arrowDivBottom.style.display = 'none';
        var iwCloseBtn = iwOuter.nextSibling;
        iwCloseBtn.style.display = 'none';
    });

    // Reset animation for all markers
    function stopMarkerAnimation() {
        for( var j = 0; j < markersOnMap.length; j++ ) {
            markersOnMap[j].setAnimation(null);
        }
    }

    google.maps.event.addListener(map, "click", function(event) {
        infoWindow.close();
        stopMarkerAnimation();
    });
}