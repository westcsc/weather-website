const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoid2VzdGNzYyIsImEiOiJjanV3bTg4dmowZHZyNDRwYmw0cGU0eWFrIn0.DB7hnW8UCDG187vT4SZwow&limit=1';


    request({url, json: true, rejectUnauthorized: false}, (error, {body}) => {
        const {features} = body;
        if (error) {
            callback('Unable to connect to location servicies!', undefined);
        } else if (features.length === 0) {
            callback('Unable to find location.  Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longtitude: features[0].center[0],
                location: features[0].place_name
            });
        }
    });
};

module.exports = geocode;
