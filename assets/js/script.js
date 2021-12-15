var inputEl = document.querySelector('#city-input');
var searchFormEl = document.querySelector('#search-form');
var cityNameEl = document.querySelector('#city-name');
var currentTempEl = document.querySelector('#temperature');
var currentHumidityEl = document.querySelector('#humidity');
var currentWindEl = document.querySelector('#wind-speed');
var currentUVEl = document.querySelector('#UV-index');

var APIKey = "2a90a8a53a1a6134f9ab3bbd3291cdae";


var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = inputEl.value.trim();
    console.log(city);
    getCityCoord(city);
}

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
          displayForecast(data);        
      });
    } else {
          alert('Error: Current weather for City not found');
    }
  })
};


var displayCurrentWeather = function(data, city) {
    // Displays current weather inside Main Weather area on page
    cityNameEl.textContent = city;
    currentTempEl.textContent = "Temp:" + data.current.temp;
    currentWindEl.textContent = "Wind:" + data.current.wind_speed;
    currentHumidityEl.textContent = "Humidity:" + data.current.humidity;
    currentUVEl.textContent = "UVI:" + data.current.uvi;
};




searchFormEl.addEventListener("submit", formSubmitHandler);