const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b033ef3ea408ca2ad005b33891cb87f7&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect to weather services");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      callback(undefined,'It is '+ body.current.weather_descriptions+ '. The temperature is '+ body.current.temperature );
    }
  });
};

module.exports = forecast;
