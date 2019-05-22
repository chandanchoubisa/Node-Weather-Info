// const request = require('request')

// const forecast = (lat, lon, callback) => {

//     const url = 'https://api.darksky.net/forecast/b735a45b2baf4823042f0582082c0a19/' + lat + ',' + lon
//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Network Problem', undefined)
//         } else if (response.body.error) {
//             callback('Weaher data is not available for this location', undefined)
//         } else {
//             callback(undefined,
//                 response.body.daily.data[0].summary + 'It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' + response.body.currently.precipProbability + '% chance of rain.'

//             )
//         }
//     });
// }

// module.exports = forecast

//Object shorthand and restructuring

const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'https://api.darksky.net/forecast/b735a45b2baf4823042f0582082c0a19/' + lat + ',' + lon
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Network Problem', undefined)
        } else if (body.error) {
            callback('Weaher data is not available for this location', undefined)
        } else {
            callback(undefined,
                body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'

            )
        }
    })
}
module.exports = forecast