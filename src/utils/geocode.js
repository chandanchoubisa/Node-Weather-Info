// const request = require('request')

// const geocode = (address, callback) => {
//     const place_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hhbmRhbjI0IiwiYSI6ImNqdmkwcWs2NDAwZ2Q0M3Ftd2J0ODdzMW8ifQ.5G5FXtO12Sfm1UErtOSuWQ&limit=1'

//     request({ url: place_url, json: true }, (error, response) => {
//         if (error) {
//             callback('Network Problem!', undefined)
//         } else if (response.body.features.length === 0) {
//             callback('Can not find this location', undefined)
//         } else {
//             callback(undefined, {
//                 lat: response.body.features[0].center[1],
//                 lon: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             })


//         }
//     })
// }

// module.exports = geocode

//Object shorthand and restructuring

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2hhbmRhbjI0IiwiYSI6ImNqdmkwcWs2NDAwZ2Q0M3Ftd2J0ODdzMW8ifQ.5G5FXtO12Sfm1UErtOSuWQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Network Problem!', undefined)
        } else if (body.features.length === 0) {
            callback('Can not find this location', undefined)
        } else {
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name
            })


        }
    })
}

module.exports = geocode