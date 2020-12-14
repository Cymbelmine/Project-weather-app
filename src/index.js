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

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  console.log(searchInput.value);
  let city = document.querySelector("h1");
  if (searchInput.value) {
    city.innerHTML = `${
      searchInput.value.charAt(0).toUpperCase() + searchInput.value.slice(1)
    }`;
    searchCity(searchInput.value);
  } else {
    city.innerHTML = null;
    alert("Please type a city name");
  }
}
function searchCity(city) {
  let apiKey = "747707261d2068249e8900a1bcf9371c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#searchCityForm");
form.addEventListener("submit", submitCity);

function clickButtonC() {
  let currentTemperature = document.querySelector("#celsius");
  currentTemperature.innerHTML = `19°C`;
}

let clickC = document.querySelector("#celsiusButton");
clickC.addEventListener("click", clickButtonC);

function clickButtonF() {
  let currentTemperature = document.querySelector("#celsius");
  currentTemperature.innerHTML = `66°F`;
}

let clickF = document.querySelector("#fahrenheitButton");
clickF.addEventListener("click", clickButtonF);

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `${city}`;
  let h1 = document.querySelector("h1");
  let temperatureElement = document.querySelector("#celsius");
  h1.innerHTML = message;
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function getPosition(position) {
  let apiKey = "747707261d2068249e8900a1bcf9371c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let url = `${apiEndpoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function clickButtonL(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let clickL = document.querySelector("#locationButton");
clickL.addEventListener("click", clickButtonL);
