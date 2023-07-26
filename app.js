const weatherAPI = '612a16667ed94d058ba195508232202';
const baseURL = 'https://api.weatherapi.com/v1'
//http://api.weatherapi.com/v1/current.json?key=612a16667ed94d058ba195508232202&q=New York&aqi=yes

//gets the current day 
const currentDate = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAB']
    const d = new Date();

    const weekday = days[d.getDay()]
    const month = d.getMonth()
    const day = d.getDate()

    const info = {weekday, month, day}
    return(info)
}

//gets devices current location
const defaultLocation = ()=>{
    const successCallback = (position) => {
        console.log(position);
      };
    
      const errorCallback = (error) => {
        console.log(error);
      };
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}


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
                tempf : currentWeather.temp_f,
                tempc : currentWeather.temp_c,
                wind : currentWeather.wind_mph,
                humidity: currentWeather.humidity
            }

            return info; 
        }

    }catch(error){
        console.log(error);
    }
}

export {getWeatherData, currentDate}
