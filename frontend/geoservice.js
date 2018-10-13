// Initialize the platform object:
var platform = new H.service.Platform({
'app_id': 'yvCqMsv9iGeW10dFMAQw',
'app_code': 'CEUMz3jRU9wp16PCTZ5gqg'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
document.getElementById('mapContainer'),
maptypes.normal.map,
{
  zoom: 10,
  center: { lat: 1.3521, lng: 103.8198 }
});

setTimeout(function() {map.setCenter({lat:52.5159, lng:13.3777});}, 3000);
