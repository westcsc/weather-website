const request = require('request');

const forecast= (longtitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ab05a28b22e297f91b8064aabef6c372/' + latitude + ',' + longtitude + '?lang=en';
    request({url, rejectUnauthorized: false, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
         } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
             callback(undefined, `${body.daily.summary}  It is currently ${body.currently.temperature} degrees out.  There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    });
};

module.exports = forecast;