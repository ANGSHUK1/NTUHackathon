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
  zoom: 12,
  center: { lat: 1.3521, lng: 103.8198 }
});
var prevObject;
function changeLocation(lat, lng){
  if (prevObject != undefined){
    map.removeObject(prevObject);
  }
  map.setCenter({lat:lat, lng: lng});
  var centerMarker = new H.map.Marker({lat:lat, lng:lng});
  map.addObject(centerMarker);
  prevObject = centerMarker;
}
