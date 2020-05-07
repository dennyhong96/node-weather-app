const request = require("postman-request");

const geoCode = (address, callback) => {
  // encodeURIComponent makes ? into %3F, etc
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiaG9uZ2hhaXlhbmc5NiIsImEiOiJjazltZnRnZjUyZzB0M3BxYnkwa3gwZmc5In0.muu6ArJgAmCQX-cL9dQPrw&limit=1`;

  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (features.length === 0) {
      callback("No matching results, please try another search!", undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;

/*
mapbox
pk.eyJ1IjoiaG9uZ2hhaXlhbmc5NiIsImEiOiJjazltZnRnZjUyZzB0M3BxYnkwa3gwZmc5In0.muu6ArJgAmCQX-cL9dQPrw
*/
