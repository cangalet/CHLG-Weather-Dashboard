var displayForecast = function(data) {

    // var forecastTitleEl = document.createElement("div");
    // forecastTitleEl.innerHTML = `
    // <div class="mdl-card__title">
    //   <span id="city-name" class="mdl-card__title-text">5 Day Forecast:</span>
    // </div>`
    // forecastTitleEl.appendChild(forecastContainerEl);
  
    forecastCardEl.innerHTML = "";
  
    for (var i = 1; i < 6; i++) {
      var date = formatDate(data.daily[i].dt);
      var icon = data.daily[i].weather[0].icon;
      var temp = data.daily[i].temp.day;
      var wind = data.daily[i].wind_speed;
      var humidity = data.daily[i].humidity;
    
      forecastCardEl.innerHTML = `
      <div class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--2-col">
        <div class="mdl-card__title">
          <span class="mdl-card__title-text">${date}</span>
        </div>
        <div class="mdl-card__supporting-text">
        
          <p>Temp: ${temp}</p>
          <p>Wind: ${wind}</p>
          <p>Humidity: ${humidity}</p>
        </div>
      </div>
      `
      
    }; 
  
  };