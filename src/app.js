const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Daniel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'Daniel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is where you can get help.',
        name: 'Daniel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    const address = req.query.address
    geoCode(address, (error, { longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
          })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    req.query()
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article does not exist.',
        message: 'Help article not found.',
        name: 'Daniel'
    })
})

const testPage = 'test'
const testURL = '/' + testPage

app.get(testURL, (req, res) => {
    res.render('help', {
        title: 'It WORKED!!!',
        message: 'Can create page URLs from variable',
        name: 'Daniel Robinson'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page Not Found',
        message: 'Page not found.',
        name: 'Daniel'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})