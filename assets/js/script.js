// Global variables and DOM elements
var inputEl = document.querySelector('#city-input');
var searchFormEl = document.querySelector('#search-form');
var cityNameEl = document.querySelector('#city-name');
var currentTempEl = document.querySelector('#temperature');
var currentHumidityEl = document.querySelector('#humidity');
var currentWindEl = document.querySelector('#wind-speed');
var currentUVEl = document.querySelector('#UV-index');
var recentSearchEl = document.querySelector('#recent-search');
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];

var APIKey = "2a90a8a53a1a6134f9ab3bbd3291cdae";

// handle search form
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = inputEl.value.trim();
    console.log(city);

    getCityCoord(city);

    searchHistory.push(city);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    recentSearchHistory();
};

// handle recent search click
var recentSearchHandler = function(event) {
  event.preventDefault();

  var city = event.target.innerHTML;
  console.log(city);
  getCityCoord(city);
};

// Uses API to get current weather
var getCityCoord = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;

    fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
            console.log(data);

            getCityWeather(data, city)
            
           // displayCurrentWeather(data, city);

          
        });
      } else {
            alert('Error: Current weather for City not found');
      }
    })
};

// using API One call to get UV index
var getCityWeather = function(data,city) {
  var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + APIKey;

  fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
          console.log(data);
          
          displayCurrentWeather(data, city);

          // Show Current Weather container
          var weatherDisplayEl = document.getElementById("weather-display");
          weatherDisplayEl.classList.add("activeWeatherDisplay");
          displayForecast(data);        
      });
    } else {
          alert('Error: Current weather for City not found');
    }
  })
};

// Displays current weather inside Main Weather area on page
var displayCurrentWeather = function(data, city) {
    var date = formatDate(data.current.dt);
    var icon = data.current.weather[0].icon;
    var cityNameEl = document.querySelector('#city-name');
    cityNameEl.innerHTML = city + " (" + date + ") " + `<img src="https://openweathermap.org/img/wn/${icon}.png"></img>`;
    currentTempEl.textContent = "Temp:" + data.current.temp;
    currentWindEl.textContent = "Wind:" + data.current.wind_speed;
    currentHumidityEl.textContent = "Humidity:" + data.current.humidity;
    currentUVEl.textContent = "UV Index:" + data.current.uvi;
};

var displayForecast = function(data) {

  var forecastTitleEl = document.querySelector('#forecast-container')
  forecastTitleEl.innerHTML = `
    <div class="mdl-card__title">
      <span id="city-name" class="mdl-card__title-text">5 Day Forecast:</span>
    </div>
    `
  
  var forecastCardEl = document.querySelector('#five-day-forecast')
  forecastCardEl.innerHTML = "";

  for (var i = 1; i < 6; i++) {
    var date = formatDate(data.daily[i].dt);
    var icon = data.daily[i].weather[0].icon;
    var temp = data.daily[i].temp.day;
    var wind = data.daily[i].wind_speed;
    var humidity = data.daily[i].humidity;
  
    forecastCardEl.innerHTML += `
      <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--2-col forecast ">
        <div class="mdl-card__title">
          <span class="mdl-card__subtitle-text">${date}</span>
        </div>
        <div class="mdl-card__supporting-text">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png"></img>
          <p>Temp: ${temp}</p>
          <p>Wind: ${wind}</p>
          <p>Humidity: ${humidity}</p>
        </div>
      </div>
      `
    }; 

};

var recentSearchHistory = function() {
  recentSearchEl.innerHTML = "";
  if (localStorage.getItem("search")) {
    recentSearch = JSON.parse(localStorage.getItem("search"));

    for (var i = 0; i < recentSearch.length; i++) {
      recentSearchEl.innerHTML += `<a class="mdl-navigation__link">${recentSearch[i]}</a>`
      console.log(recentSearch[i])
      
    };
  }
};

// Format Unix date to readable format
var formatDate = function(date) {
  const milliseconds = date * 1000 
  const dateObject = new Date(milliseconds)
  let options = { month: 'numeric', day: 'numeric', year: 'numeric' };
  const humanDateFormat = dateObject.toLocaleString("en-US", options)

  return humanDateFormat;
}

recentSearchHistory();
searchFormEl.addEventListener("submit", formSubmitHandler);
recentSearchEl.addEventListener("click", recentSearchHandler);
