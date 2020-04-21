const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=224ef1f93ed53c307fd303b2afe2bf9a&query=' + lat + ',' + lon
    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback('Could not connect to the weather service.')
        } else if (body.error) {
            callback('Invalid location. Try a new search.')
        } else {
            callback(undefined, 'Weather Description: ' + body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees. The wind direction is ' + body.current.wind_dir + ', and is blowing at ' + body.current.wind_speed + ' mph.')
        }
    })

}

module.exports = forecast