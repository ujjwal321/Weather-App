const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=da1c0698bdc99813ea495deb8009300e&query=' +
		latitude +
		',' +
		longitude +
		'&units=f';
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('unable to connect to weather services!', undefined);
		} else if (body.error) {
			callback(body.error.info, undefined);
		} else {
			callback(undefined, {
				temperature: body.current.temperature,
				precipitation: body.current.precip,
				feelslike: body.current.feelslike,
				desc: body.current.weather_descriptions[0]
			});
		}
	});
};

module.exports = forecast;
