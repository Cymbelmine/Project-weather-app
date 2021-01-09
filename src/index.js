let now = new Date();
let dateTime = document.querySelector("small");
let date = now.getDate();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let time = now.getHours() + ":" + minutes;
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let day = days[now.getDay()];

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
  let message = `${city}`;
  let h1 = document.querySelector("h1");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity")
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;
h1.innerHTML = message;
temperature.innerHTML = Math.round(celsusTemperature);
city.innerHTML = response.data.name;
description.innerHTML = response.data.weather[0].description;
humidity.innerHTML = response.data.main.humidity;
wind.innerHTML = Math.round(responde.data.wind.speed);
date.innerHTML = formatDate(response.data.dt * 1000);
icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
icon.setAttribute("alt", response.data.weather[0].description);
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
let city = document.querySelector("#city");
  if (searchInput.value) {
    city.innerHTML = `${
      searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1)
    }`;
 searchCity(searchInput.value);
}

let form = document.querySelector("#searchCityForm");
form.addEventListener("submit", submitCity);

let celsiusLink = document.querySelector("celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let FahrenheitLink = document.querySelector("celsius-link");
FahrenheitLink.addEventListener("click", showFahrenheitTemperature);

searchCity("Sydney");