import { getWeatherData} from './app.js';

//gets user input 
const getInput = () => {
    return new Promise(resolve => {
      const go = document.getElementById('go');
      const userInput = document.getElementById('search');
  
      const handleClick = () => {
        const input = userInput.value;
        userInput.value = '';
        resolve(input);
      }
  
      go.addEventListener('click', handleClick);
    });
}

//update the display 
const updateDisplay = data => {
  const locationHeader = document.querySelector('.location-header');
  const temperature = document.querySelector('#temp');
  const condition = document.querySelector('#condition');
  const wind = document.querySelector('#wind');
  const humidity = document.querySelector('#humidity');

  console.log(data)

  locationHeader.innerHTML = data.lname;
  condition.innerHTML = data.condition;
  temperature.innerHTML = `Temperature: ${data.temp}`
  wind.innerHTML = `Wind: ${data.wind}`
  humidity.innerHTML = `Humidity: ${data.humidity}`

}

const update = async () =>{
    const input = await getInput();
    const info = await getWeatherData(input)
    updateDisplay(info);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('go').addEventListener('click', update);
});