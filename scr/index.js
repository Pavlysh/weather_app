function showWeatherForNextDays(daily) {
  let newDay = `<div class="row text-break"> `;
  let dayicon;

  let countDate = 0;

  daily.forEach((element) => {
    tempDate = currentDate.getDay() + countDate;
    if (tempDate > 6) {
      countDate = 0;
      tempDate = 0;
    } else {
      countDate = countDate + 1;
    }

    dayicon =
      "http://openweathermap.org/img/w/" + element.weather[0].icon + ".png";
    newDay =
      newDay +
      `<div class="col colheader"> ${arrayOfdays[tempDate]} </br> <img src=${dayicon} alt="Weather day icon"/> </br> ${element.temp.day}&#176 </br>${element.humidity}% </br>${element.wind_speed} </div>`;
  });
  newDay = newDay + `</div>`;

  document.querySelector("#weather-another-day").innerHTML = newDay;
}

function showTemp(responce) {
  let icon =
    "http://openweathermap.org/img/w/" +
    responce.data.current.weather[0].icon +
    ".png";
  let t1 = responce.data.current.temp;
  let t2 = responce.data.current.feels_like;
  //document.querySelector(".LabelCity").innerHTML = responce.data.name;
  document.querySelector("#tMin").innerHTML = t1;
  document.querySelector("#tMax").innerHTML = t2;
  document.querySelector(".headW").innerHTML =
    "Wind: " + responce.data.current.wind_speed.toString();
  document.querySelector(".headH").innerHTML =
    "Humidity: " + responce.data.current.humidity.toString() + "%";
  document.querySelector(".headP").innerHTML =
    responce.data.current.weather[0].description.toString();
  if (window.itIsTempInCelsius) {
    document.querySelector("#tempTypeC").style.color = "black";
    document.querySelector("#tempTypeF").style.color = "darkblue";
  } else {
    document.querySelector("#tempTypeC").style.color = "darkblue";
    document.querySelector("#tempTypeF").style.color = "black";
  }
  document.querySelector("#wicon").src = `${icon}`;
  showWeatherForNextDays(responce.data.daily);
}
function cityIsNotFound() {
  document.querySelector("#tMin").innerHTML = "No data";
  document.querySelector("#tMax").innerHTML = "No data";
  document.querySelector(".headW").innerHTML = "-";
  document.querySelector(".headH").innerHTML = "-";
}
function getPosition(units) {
  let apiKey = "3c1bab47a46bc2563493cd283206466e";
  // let units = "metric";
  let cityname = document.querySelector(".LabelCity").innerHTML;
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=${units}&appid=${apiKey}`;

  axios
    .get(weatherURL)
    .then((responce) => showCurrentCityandWeather(responce, units))
    .catch(cityIsNotFound);
}

function SetHead() {
  if (window.itIsTempInCelsius) {
    getPosition("metric");
  } else {
    getPosition("imperial");
  }
}

function CitySearch() {
  cityname = document.getElementById("inputCity").value.toString();
  cityname = cityname.toUpperCase();
  cityname = cityname.trim();

  document.querySelector(".LabelCity").innerHTML = cityname;

  SetHead();
}

function enterCity(defcity) {
  document.getElementById("inputCity").value = defcity;
  //alert(document.querySelector(".defcity1").innerHTML.toString());
}

let buttonsearch = document.querySelector("#button-addon2");
buttonsearch.addEventListener("click", CitySearch);

defcityl1 = document.querySelectorAll(".defcity1");

for (let i = 0; i < defcityl1.length; i++) {
  defcityl1[i].addEventListener("click", () =>
    enterCity(defcityl1[i].innerHTML)
  );
}
let currentDate = new Date();
tempDay = currentDate.getDay();

let arrayOfdays = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
document.querySelector("#curDate").innerHTML =
  arrayOfdays[tempDay] + " " + currentDate.toLocaleTimeString();
let itIsTempInCelsius = true;

function SetTemp(isCelsiuseType) {
  if (window.itIsTempInCelsius === undefined) {
    window.itIsTempInCelsius = true;
  }

  if (isCelsiuseType) {
    getPosition("metric");
  } else {
    getPosition("imperial");
  }

  window.itIsTempInCelsius = isCelsiuseType;
}
function showCurrentCityandWeatherByCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c1bab47a46bc2563493cd283206466e";

  let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  axios
    .get(weatherURL)
    .then((responce) => showTemp(responce))
    .catch(cityIsNotFound);
}

function showCurrentCityandWeather(position, unit) {
  let lat = position.data.coord.lat;
  let lon = position.data.coord.lon;

  let apiKey = "3c1bab47a46bc2563493cd283206466e";

  let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

  axios
    .get(weatherURL)
    .then((responce) => showTemp(responce))
    .catch(cityIsNotFound);
}

//debugger;
let cityname = "";
let clickTypeC = document.querySelector("#tempTypeC");
clickTypeC.addEventListener("click", () => SetTemp(true));

let clickTypeF = document.querySelector("#tempTypeF");
clickTypeF.addEventListener("click", () => SetTemp(false));

var el = document.getElementById("inputCity");
el.addEventListener("keydown", CitySearch);

window.itIsTempInCelsius = true;
navigator.geolocation.getCurrentPosition(
  showCurrentCityandWeatherByCoordinates
);
