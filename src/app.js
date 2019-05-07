const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Bruce West'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title:'All About Rockport',
        name: 'Bruce West'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'There is a fishing problem in Rockport',
        title: 'Help',
        name: 'Bruce West'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        });
    };

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
    
        if (error) {
            return res.send({error});
        }
    
        forecast(longtitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    });
});

app.get('/products', (req, res) => {
    console.log(req.query.manufacturer);
    res.send({
        products: []
    });

})
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404 Error - Help File not found',
        name: 'Bruce West',
        errorMsg: 'The help file page was not found'
    })
});

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404 Error Page',
        name: 'Bruce West',
        errorMsg: 'This page was not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});