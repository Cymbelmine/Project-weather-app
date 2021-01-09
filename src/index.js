function formatDate (timestamp) {
    let date = new Date(timestamp);
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp){
      let date = new Date(timestamp);
    let hours = date.getHours();
     if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

let months = [
  "Jan",
  "Feb",
  "Ma",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let formattedDate = `${day}, ${month} ${date}, ${time}, ${year}`;
console.log(formattedDate);
dateTime.innerHTML = formattedDate;

let celsiusTemperature = null;

function showWeather(response) {
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity")
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;
temperature.innerHTML = Math.round(celsusTemperature);
city.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].description;
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = Math.round(responde.data.wind.speed);
date.innerHTML = formatDate(response.data.dt * 1000);
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response){
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 6; index++) {
forecast = response.data.list[index];
forecastElement.innerHTML += `<div class="col-2">
        <h3>
            ${formatHours(forecast.dt * 1000)}
        </h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
        <div class="weather-forecast-temperature">
            <strong>${Math.round(forecast.main.temp_max)}º 
            </strong> 
            ${Math.round(forecast.main.temp_min)}º
        </div>
    </div>`;    
}
}
function searchCity(city) {
  let apiKey = "747707261d2068249e8900a1bcf9371c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showWeather);
 apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showForecast);
}
function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
 searchCity(searchInput.value);
}

function showFahrenheitTemperature(event){
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
celsiusLink.classList.remove("active");
FahrenheitLink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#searchCityForm");
form.addEventListener("submit", submitCity);

let celsiusLink = document.querySelector("celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let FahrenheitLink = document.querySelector("celsius-link");
FahrenheitLink.addEventListener("click", showFahrenheitTemperature);

searchCity("Sydney");