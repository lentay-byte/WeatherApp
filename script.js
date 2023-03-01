import { getWeatherData, currentDate} from './app.js';

//shows the current day 

const showDate = dateInfo => {
  let dayMonth = `${dateInfo.month}/${dateInfo.day}`

  document.getElementById('day').innerHTML = dateInfo.weekday;
  document.getElementById('date').innerHTML = dayMonth;
}

showDate(currentDate())

//change temperature measurement 
const toggleMeasurement = () => {
    document.querySelector()
}

//gets user input 
const getInput = () => {
    return new Promise(resolve => {
      const userInput = document.getElementById('search');
      const input = userInput.value;
      userInput.value = '';
      resolve(input);
    });
}

//update the display 
const updateDisplay = data => {
  const locationHeader = document.querySelector('.location-header');
  const temperature = document.querySelector('#tempVal');
  const condition = document.querySelector('#condition');
  const wind = document.querySelector('#wind');
  const humidity = document.querySelector('#humidity');

  locationHeader.innerHTML = data.lname;
  condition.innerHTML = data.condition;
  temperature.innerHTML = `${Math.trunc(data.temp)}`
  wind.innerHTML = `Wind: ${data.wind}`
  humidity.innerHTML = `Humidity: ${data.humidity}`

}

//updates information in the DOM based on the user's input 
const update = async () =>{
  const input = await getInput();
  const info = await getWeatherData(input)
  updateDisplay(info);
}

//runs the update function everytime the information clicked
document.getElementById('go').addEventListener('click', update);
