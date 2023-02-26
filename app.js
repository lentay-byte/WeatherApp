const weatherAPI = '612a16667ed94d058ba195508232202';
const baseURL = 'http://api.weatherapi.com/v1'
//http://api.weatherapi.com/v1/current.json?key=612a16667ed94d058ba195508232202&q=New York&aqi=yes


// gets weather data based on location using api
const getWeatherData = async location => {
    const apiMethod = '/current.json';
    const key = `?key=${weatherAPI}`; //
    const param = `&q=${location}`;

    //contructs URL to fetch 
    const urlToFetch = `${baseURL}${apiMethod}${key}${param}`;

    try{
        const response = await fetch(urlToFetch);
        if(response.ok){
            const jsonResponse = await response.json();
            const currentWeather = jsonResponse.current;
            const area =jsonResponse.location;

            //extract necessary data
            const info = {
                lname : area.name,
                condition : currentWeather.condition.text,
                temp : currentWeather.temp_f,
                wind : currentWeather.wind_mph,
                humidity: currentWeather.humidity
            }

            return info; 
        }

    }catch(error){
        console.log(error);
    }
}

//console.log(getWeatherData('New York'))
export {getWeatherData}