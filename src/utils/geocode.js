const request = require('postman-request');

const geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		encodeURIComponent(address) +
		'.json?access_token=pk.eyJ1IjoidWpqd2FsMTIzNCIsImEiOiJja2RoazZmdDEyMWo4MnFtcGJ5Ymw0dG1hIn0.e5FMiRaVL-1uSe0KkD5_HQ&limit=1';
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('unable to connect to location services!', undefined);
		} else if (body.features === undefined) {
			callback('Please provide a place name', undefined);
		} else if (body.features.length === 0) {
			callback('please provide a valid address', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};

module.exports = geocode;
