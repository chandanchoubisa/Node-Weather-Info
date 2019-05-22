const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const app = express()



console.log(__dirname)

//Define path for express configs
const PublicDir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialpath)

//Setup static directory to serve
app.use(express.static(PublicDir))
    // app.get('', (req, res) => {
    //     res.send('Hello server')
    // })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Chandan Choubisa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Chandan Choubisa'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide address'
        })
    }

    geocode(req.query.address, (error, { lat, lon, location } = {}) => { //default params
            if (error) {
                return res.send({ error })
            }

            forecast(lat, lon, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
        // console.log(req.query)
        // res.send({
        //     forecast: 'It is raining',
        //     address: req.query.address
        // })
})




app.get('/help', (req, res) => {
    res.render('help', {
        message: 'It is help page',
        title: 'Help',
        name: 'Chandan Choubisa'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search item'
        })
    }
    console.log(req.query)
    res.send({ products: [] })
})


app.get('/help/*', (req, res) => {
    res.render('Error', {
        title: 'Error',
        message: 'Help article not found',
        name: 'Chandan Choubisa'
    })
})

app.get('*', (req, res) => {
    res.render('Error', {
        title: '404',
        message: 'Page not found',
        name: 'Chandan Choubisa'
    })
})

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.listen(3000, () => {
    console.log('Server is running on 3000 port')
})