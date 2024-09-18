const URL_IMAGES = './images/weather/';
const weather_interpretation_codes = {
  0: URL_IMAGES + 'clear-sky.png',
  1:URL_IMAGES + 'mainly-clear.png',
  2:URL_IMAGES + 'partly-cloudy.png',
  3:URL_IMAGES + 'overcast.png',
  45:URL_IMAGES + 'fog.png',
  48:URL_IMAGES + 'fog.png',
  51:URL_IMAGES + 'light-drizzle.png',
  53:URL_IMAGES + 'moderate-drizzle.png',
  55:URL_IMAGES + 'heavy-drizzle.png',
  56:URL_IMAGES + 'freezing-drizzle.png',
  57:URL_IMAGES + 'freezing-drizzle.png',
  61:URL_IMAGES + 'light-rain.png',
  63:URL_IMAGES + 'moderate-rain.png',
  65:URL_IMAGES + 'heavy-rain.png',
  66:URL_IMAGES + 'freezing-rain.png',
  67:URL_IMAGES + 'freezing-rain.png',
  71:URL_IMAGES + 'snow-fall-light.png',
  73:URL_IMAGES + 'snow-fall-moderate.png',
  75:URL_IMAGES + 'snow-fall-heavy.png',
  77:URL_IMAGES + 'snow-grains.png',
  80:URL_IMAGES + 'rain-showers.png',
  81:URL_IMAGES + 'rain-showers.png',
  82:URL_IMAGES + 'rain-showers.png',
  85:URL_IMAGES + 'snow-showers.png',
  86:URL_IMAGES + 'snow-showers.png',
  95:URL_IMAGES + 'thunderstorm.png',
  96:URL_IMAGES + 'thunderstorm.png',
  99:URL_IMAGES + 'thunderstorm.png',
}

let weather_code;
let current_temperature;
let coordinates;
let city;

let weather_text_elem = document.querySelector(".weather__text");
let weather_icon_elem = document.querySelector(".weather__icon");
let weather_city_elem = document.querySelector(".weather__city");

//получить погоду
let getWeather = async(coordinates)=>{
  await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates[0]}&longitude=${coordinates[1]}&current=temperature_2m,weather_code`).then(function(resp){ return resp.json()}).then(function(data){
      current_temperature = data.current.temperature_2m;
      weather_text_elem.textContent = `${Math.round(current_temperature)} °C`;
      weather_code = data.current.weather_code;
      weather_icon_elem.src = weather_interpretation_codes[weather_code];
  })
  .catch(function(e){
      console.log(e)
  })
}

window.onload = async () => {
  city = localStorage.getItem("city");
  if(city === null) {
    //получить координаты от устройства
    const getCoords = async () => {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return [
          pos.coords.longitude,
          pos.coords.latitude,
      ];
    };
    coordinates = await getCoords();
    //получить название нас.пункта по координатам от яндекс api
    ymaps.ready(getCityName);
    function getCityName() {
      let myReverseGeocoder = ymaps.geocode([coordinates[1], coordinates[0]]);
      myReverseGeocoder.then(
        function (res) {
          let nearest = res.geoObjects.get(0);
          city = nearest.properties.get("description");
          localStorage.setItem('city', city);
          getWeather(coordinates).then(()=> weather_city_elem.textContent = city) 
        }
      );
    }

  }else{
      city = localStorage.getItem('city');
      //получить координаты по названию нас.пункта в localstorage от яндекс api
      ymaps.ready(getCoordinatesByCityName);
      function getCoordinatesByCityName() {
        let myGeocoder = ymaps.geocode(city);
        myGeocoder.then(
            function (res) {
                coordinates = res.geoObjects.get(0).geometry.getCoordinates();
                getWeather(coordinates).then(()=> weather_city_elem.textContent = city)
            },
        );
      }
  }
}

