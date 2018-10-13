var platform = new H.service.Platform({
'app_id': 'yvCqMsv9iGeW10dFMAQw',
'app_code': 'CEUMz3jRU9wp16PCTZ5gqg'
});

function geocode(address, successCallback) {
  var geocoder = platform.getGeocodingService(),
    geocodingParameters = {
      searchText: address,
      jsonattributes : 1
    };

  geocoder.geocode(
    geocodingParameters,
    successCallback,
    onError
  );
}

function onError(error) {
  alert('Ooops!');
}
