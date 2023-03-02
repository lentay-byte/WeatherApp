import { getWeatherData, currentDate} from './app.js';

//shows the current day 

const showDate = dateInfo => {
  let dayMonth = `${dateInfo.month}/${dateInfo.day}`

  document.getElementById('day').innerHTML = dateInfo.weekday;
  document.getElementById('date').innerHTML = dayMonth;
}

showDate(currentDate())

//change temperature measurement 


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
const updateDisplay = (data, state) => {
  const locationHeader = document.querySelector('.location-header');
  const temperature = document.querySelector('#tempVal');
  const condition = document.querySelector('#condition');
  const wind = document.querySelector('#wind');
  const humidity = document.querySelector('#humidity');

  //update elements 
  
  locationHeader.innerHTML = data.lname;
  temperature.innerHTML = Math.trunc(data.tempf)
  condition.innerHTML = data.condition;
  wind.innerHTML = `Wind: ${data.wind}`
  humidity.innerHTML = `Humidity: ${data.humidity}`
  
}


//displays the information
const update = async () =>{
  const input = await getInput();
  const info = await getWeatherData(input)
  updateDisplay(info);
}

//runs the update function everytime the information clicked
document.getElementById('go').addEventListener('click', update);

