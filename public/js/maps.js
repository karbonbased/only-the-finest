var map = null;
var infowindow = null;


// WORKING CODE WITH REFRESH BUG
function initialize() {

      // Create an array of styles.
    var styles = [ { "featureType": "landscape", "stylers": [ { "color": "#B2B2B2" } ] },{ "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#B2B2B2" } ] },{ "featureType": "administrative", "elementType": "labels", "stylers": [ { "color": "#575757" }, { "visibility": "simplified" } ] },{ "featureType": "road", "elementType": "labels.text", "stylers": [ { "visibility": "simplified" }, { "weight": 8 }, { "color": "#575757" } ] },{ "featureType": "transit", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] },{ },{ "featureType": "poi.park", "elementType": "labels.text", "stylers": [ { "color": "#575757" }, { "visibility": "simplified" } ] },{ "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "simplified" }, { "color": "#575757" } ] },{ "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#808080" } ] },{ "featureType": "poi.park", "elementType": "geometry" }, {"featureType": "water", "elementType": "labels", "stylers": [{ "visibility": "simplified" }, { "color": "#575757" }]},  {"featureType": "road", "elementType": "labels.icon", "stylers": [{ "saturation": -100 }]} ]

    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
    var styledMap = new google.maps.StyledMapType(styles,
      {name: "Styled Map"});

      var map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: {lat: 40.696829, lng: -73.935232},
        zoom: 12,
        minZoom: 10,
        streetViewControl: false,
        mapTypeControl: false,
        mapTypeId: [google.maps.MapTypeId.ROADMAP, 'map_style']
      });

            //Associate the styled map with the MapTypeId and set it to display.
      map.mapTypes.set('map_style', styledMap);
      map.setMapTypeId('map_style');

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); //CAUSING REFRESH TO LOSE MARKERS ON KEYUP

      // // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
      });
      addMarkers(map);
      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function(marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

   // var contentString = '<div id="content">'+
   //       '<h1>'+
   //       place.name+
   //       '</h1>'+
   //       '<p>'+
   //       'blah blah blah'+
   //       '</p>'
   //        '</div>';

   //        var infowindow = new google.maps.InfoWindow({
   //          content: contentString
   //        });

   //         marker.addListener('click', function() {
   //          console.log("marker listener clicked");
   //        infowindow.open(map, marker);
   //      });

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
        // DISPLAY THE MAP
  google.maps.event.addDomListener(window, "resize", function() {
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center); 
  })
}


var addMarkers = function(map) {

	//ajax call to get location data
	$.ajax('/locations/json').
		done(function(result) {
			// add location markers
			for (var i=0; i < result.length; i++) {
				marker = new google.maps.Marker ({
				    map: map,
				    icon: '../img/money_bag_sm.png',
				    position: { lat: result[i].lat, lng: result[i].lng },
				    title: result[i].name
				});
		  };
		});
} // end addMarkers