const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');

const port = process.env.PORT || 3000;

//define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup static directory to serve
app.use(express.static(publicDirectory));

//setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'UJ'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Dog',
		name: 'UJ'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		message: 'This is the help page',
		name: 'UJ'
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'you must provide an address'
		});
	}
	console.log(req.query.address);
	try {
		geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
			if (error) {
				return res.send({
					error: error
				});
			} else {
				forecast(latitude, longitude, (err, forecastdata) => {
					if (err) {
						return res.send({
							error: err
						});
					} else {
						res.send({
							location: location,
							temperature: forecastdata.temperature,
							precipitation: forecastdata.precipitation,
							feelslike: forecastdata.feelslike,
							desc: forecastdata.desc
						});
					}
				});
			}
		});
	} catch (e) {
		res.send({
			error: 'Enter a valid Address'
		});
	}
});

app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'you must provide a search term'
		});
	}
	console.log(req.query);
	res.send({
		products: []
	});
});
app.get('/help/*', (req, res) => {
	res.render('404page', {
		title: '404',
		name: 'UJ',
		errorMsg: 'Help Article not found.'
	});
});
app.get('*', (req, res) => {
	res.render('404page', {
		title: '404',
		name: 'UJ',
		errorMsg: 'Page Not Found.'
	});
});

//start the server
app.listen(port, () => {
	console.log('server is up on port' + port);
});

//app.com
//app.com/help
//app.com.about
//root route
// app.get('', (req, res) => {
// 	res.send('<h1>Weather page</h1>');
// });

// //help route
// app.get('/help', (req, res) => {
// 	res.send('<h1>Help</h1>');
// });

// //about route
// app.get('/about', (req, res) => {
// 	res.send('<h1>About</h1>');
// });
//weather route
