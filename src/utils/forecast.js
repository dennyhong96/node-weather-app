const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=bcc9f6dbe9362fa6940e4b754784c603&query=${lat},${long}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      // if error is populated, then handle low level os error like network issue
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      // handle user input errors here
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. ` +
          `It feels like ${body.current.feelslike} degress out.`
      );
    }
  });
};

module.exports = forecast;

/*
weatherwtack
bcc9f6dbe9362fa6940e4b754784c603
http://api.weatherstack.com/current
*/
