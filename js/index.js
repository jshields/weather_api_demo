
/*
IDEAs
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
        return '${this.root}/points/${latitude},${longitude}/forecast';
    }
};




const getWeatherForecast = async (latitude, longitude) => {

    const url = weatherAPI.forecast(latitude, longitude);

    // redirects?
    // https://api.weather.gov/gridpoints/LOT/74,73/forecast

    const weather = await fetch(url, {
        method: 'GET',
        headers: {
          //'Content-Type': 'application/json',
          //'Accept': 'application/vnd.noaa.dwml+xml;version=1',
          'Accept': 'application/geo+json', // ;version=1
        }
    }).then(res => res.json())
    // TODO
    //.then(...
    //.catch(...)

    return weather;
};



const CHICAGO_POINT = [CHICAGO_LAT, CHICAGO_LONG] = [41.8781, 87.6298];
const chicagoWeatherForecast = getWeatherForecast(...CHICAGO_POINT);

window.addEventListener('load', function (ev) {

    // re-stringifying after parsing, but this is for debug purposes only
    document.getElementById('payload').innerText = JSON.stringify(chicagoWeatherForecast);

    document.getElementById('shortForecast').innerText = chicagoWeatherForecast.shortForecast;
}

}  // end `window` closure
