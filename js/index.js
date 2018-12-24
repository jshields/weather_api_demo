
/*
IDEA use weather emoji
https://github.com/twitter/twemoji
https://github.com/emojione/emojione
https://css-tricks.com/snippets/css/using-font-face/
*/


{  // begin `window` closure

/*
https://forecast-v3.weather.gov/documentation
https://www.weather.gov/documentation/services-web-api
*/
const weatherAPI = {
    root: 'https://api.weather.gov',
    //version: ,
    forecast(latitude, longitude) {
        // weather forecast for point: EPSG:4326 latitude, EPSG:4326 longitude
        return `${this.root}/points/${latitude},${longitude}/forecast`
    }
};


const getWeatherForecast = async (latitude, longitude) => {

    const url = weatherAPI.forecast(latitude, longitude);

    // redirects?
    // https://api.weather.gov/gridpoints/LOT/74,73/forecast

    // wait for the fetch promise
    // FIXME may not need this to be blocking
    const weather = await fetch(url, {
        method: 'GET',
        headers: {
          //'Content-Type': 'application/json',
          //'Accept': 'application/vnd.noaa.dwml+xml;version=1',
          'Accept': 'application/geo+json', // ;version=1
        }
    }).then(response => response.json())
    .catch(error => console.error('Error:', error));

    // return the Promise that was resolved with the response value
    // TODO need to check response status code as well
    return weather;
};


// IDEA location can come from the browser, request location or allow it to be manually set
const CHICAGO_POINT = [CHICAGO_LAT, CHICAGO_LONG] = [41.8781, -87.6298];


window.addEventListener('load', function (ev) {

    // TODO loading indicator
    const chicagoWeatherForecast = getWeatherForecast(...CHICAGO_POINT);
    chicagoWeatherForecast.then(weather => {
        const nowForecast = weather.properties.periods[0];
        document.getElementById('shortForecast').innerText = `
            ${nowForecast.shortForecast}, 
            ${nowForecast.temperature} ${nowForecast.temperatureUnit}
        `;
    }).catch(e => console.error(e));

});

}  // end `window` closure
