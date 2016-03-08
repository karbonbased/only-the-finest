function initialize() {

  // Create an array of styles.
  var styles = [ { "featureType": "landscape", "stylers": [ { "color": "#B2B2B2" } ] },{ "featureType": "poi.park", "elementType": "geometry", "stylers": [ { "color": "#B2B2B2" } ] },{ "featureType": "administrative", "elementType": "labels", "stylers": [ { "color": "#575757" }, { "visibility": "simplified" } ] },{ "featureType": "road", "elementType": "labels.text", "stylers": [ { "visibility": "simplified" }, { "weight": 8 }, { "color": "#575757" } ] },{ "featureType": "transit", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] },{ "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] },{ },{ "featureType": "poi.park", "elementType": "labels.text", "stylers": [ { "color": "#575757" }, { "visibility": "simplified" } ] },{ "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "simplified" }, { "color": "#575757" } ] },{ "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#808080" } ] },{ "featureType": "poi.park", "elementType": "geometry" } ]

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 12,
    minZoom: 10,
    streetViewControl: false,
    mapTypeControl: false,
    center: new google.maps.LatLng(40.696829, -73.935232),
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  	addMarkers(map);



	// DISPLAY THE MAP
	google.maps.event.addDomListener(window, 'load', initialize);
	}

var addMarkers = function(map) {

	//ajax call to get location data
	$.ajax('/locations/json').
		done(function(result) {
			// add location markers
			for (var i=0; i < result.length; i++) {
				marker = new google.maps.Marker ({
				    map: map,
				    icon: '../img/money_bag_marker.png',
				    position: { lat: result[i].lat, lng: result[i].lng },
				    title: result[i].name
				});
		  };
		});
} // end addMarkers

