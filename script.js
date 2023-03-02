import { getWeatherData, currentDate} from './app.js';

//shows the current day 

const showDate = dateInfo => {
  let dayMonth = `${dateInfo.month}/${dateInfo.day}`

  document.getElementById('day').innerHTML = dateInfo.weekday;
  document.getElementById('date').innerHTML = dayMonth;
}

showDate(currentDate())


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

  if(state){
    temperature.innerHTML = Math.trunc(data.tempf)
  }else{
    temperature.innerHTML = Math.trunc(data.tempc)
  }
  
  condition.innerHTML = data.condition;
  wind.innerHTML = `Wind: ${data.wind}`
  humidity.innerHTML = `Humidity: ${data.humidity}`
  
}

//changes the measurement 
let isfarenheit = true;
const slider = document.querySelector('.slider')


slider.onclick = async ()=>{
  isfarenheit = !isfarenheit;

  //changes the measurement symbol
  if(isfarenheit){
    document.getElementById('tempMeasurement').innerHTML = '&degF'
  }else{
    document.querySelector('#tempMeasurement').innerHTML = '&degC'
  }

  //checks if a location was already selected and changes the information if the mearsure is changed 
  const locationHeader = document.querySelector('.location-header')

  
  if(locationHeader.textContent != '...'){
    const info = await getWeatherData(locationHeader.textContent)
    updateDisplay(info, isfarenheit);
    
  }
}



//function to display based on location
const update = async () =>{

  const input = await getInput();
  const info = await getWeatherData(input)
  updateDisplay(info, isfarenheit);
  
}

//runs the update function everytime the information clicked
document.getElementById('go').addEventListener('click', update);

