function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function setValue(maxID, prefix) {
  let ID = "";

  for (let index = 1; index <= maxID; index++) {
    ID = prefix + index.toString();

    if (prefix === ".mh") {
      let tempHumidity = getRandomIntInclusive(10, 100);
      document.querySelector(ID).innerHTML = tempHumidity.toString() + "%";
      if (tempHumidity < 30) {
        document.querySelector(".em" + index.toString()).innerHTML = "🌞";
      } else if (tempHumidity < 60 && tempHumidity >= 30) {
        document.querySelector(".em" + index.toString()).innerHTML = "⛅";
      } else if (tempHumidity > 60) {
        document.querySelector(".em" + index.toString()).innerHTML = "🌧";
      }
    } else {
      if (prefix === ".t") {
        let t1 = getRandomIntInclusive(7, 26);
        let t2 = getRandomIntInclusive(t1, 26);
        document.querySelector(ID).innerHTML =
          t1.toString() + "&#176C-" + t2.toString() + "&#176C";
      } else if (prefix === ".w") {
        document.querySelector(ID).innerHTML =
          getRandomIntInclusive(1, 15).toString() + " km/h";
      } else if (prefix === ".mp") {
        document.querySelector(ID).innerHTML =
          getRandomIntInclusive(10, 100).toString() + "%";
      }
    }
  }
}
function SetHumidity(city) {
  setValue(7, ".mh");
}
function SetTemp(city) {
  setValue(7, ".t");
}

function showTemp(responce) {
  let icon =
    "http://openweathermap.org/img/w/" + responce.data.weather[0].icon + ".png";
  let t1 = responce.data.main.temp_min;
  let t2 = responce.data.main.temp_max;
  document.querySelector(".LabelCity").innerHTML = responce.data.name;
  document.querySelector("#tMin").innerHTML = t1;
  document.querySelector("#tMax").innerHTML = t2;
  document.querySelector(".headW").innerHTML =
    "Wind: " + responce.data.wind.speed.toString();
  document.querySelector(".headH").innerHTML =
    "Humidity: " + responce.data.main.humidity.toString() + "%";
  document.querySelector(".headP").innerHTML =
    responce.data.weather[0].description.toString();
  if (window.itIsTempInCelsius) {
    document.querySelector("#tempTypeC").style.color = "orange";
    document.querySelector("#tempTypeF").style.color = "darkblue";
  } else {
    document.querySelector("#tempTypeC").style.color = "darkblue";
    document.querySelector("#tempTypeF").style.color = "orange";
  }
  document.querySelector("#wicon").src = `${icon}`;
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
    .then((responce) => showTemp(responce))
    .catch(cityIsNotFound);
}
function SetHead() {
  // let t1 = getRandomIntInclusive(7, 26);
  //let t2 = getRandomIntInclusive(t1, 26);
  if (window.itIsTempInCelsius) {
    getPosition("metric");
  } else {
    getPosition("imperial");
  }
  //navigator.geolocation.get (getPosition);
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

let arrayOfdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
function showCurrentCityandWeather(position, unit = "metric") {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3c1bab47a46bc2563493cd283206466e";
  //let units = unit; //"metric";
  let weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;

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
window.itIsTempInCelsius = true;
navigator.geolocation.getCurrentPosition(showCurrentCityandWeather);
