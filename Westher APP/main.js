// var loader = document.getElementById('preloader');

// window.addEventListener("load", function () {
//   loader.style.display = "none";


const api = {
  key: "31515bb41be448fe95f05832230405",
  base: "https://api.weatherapi.com/v1"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}/forecast.json?key=${api.key}&q=${query}&days=7`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(displayResults)
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.location.name}, ${weather.location.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const forecast = weather.forecast.forecastday;
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const forecastContainer = document.querySelector('.forecast');
  forecastContainer.innerHTML = '';

  forecast.forEach((day, index) => {
    const dayOfWeek = daysOfWeek[(now.getDay() + index) % 7];
    const forecastHTML = `
      <div class="day">
        <div class="forecast-header">
          <div class="day-name">${dayOfWeek}</div>
        </div>
        <div class="forecast-content">
          <div class="forecast-icon">
            <img src="https:${day.day.condition.icon}" alt="" width=48>
          </div>
          <div class="degree">${day.day.maxtemp_c}<span>°C</span></div>
          <small>${day.day.condition.text}</small>
        </div>
      </div>
    `;
    forecastContainer.insertAdjacentHTML('beforeend', forecastHTML);
  });
}

function dateBuilder(date) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const today = date.getDate();

  return `${day} ${today} ${month} ${year}`;
}
