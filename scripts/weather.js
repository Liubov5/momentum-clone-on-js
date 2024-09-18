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

let weather_text_elem = document.querySelector(".weather__text");
let weather_icon_elem = document.querySelector(".weather__icon");
let weather_city_elem = document.querySelector(".weather__city");


window.onload = async () => {
  let city = localStorage.getItem("city");
  city === null ? localStorage.setItem('city', 'Краснодар') : localStorage.getItem('city');
    

    const getCoords = async () => {
            const pos = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        
            return {
              longitude: pos.coords.longitude,
              latitude: pos.coords.latitude,
            };
    };
    
    const {longitude, latitude} = await getCoords();
    ymaps.ready(init);
    function init() {
      let myReverseGeocoder = ymaps.geocode([latitude,longitude]);
      myReverseGeocoder.then(
        function (res) {
          let nearest = res.geoObjects.get(0);
          city = nearest.properties.get("description");
          weather_city_elem.textContent = city;
        }
      );
    }
    

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)
        .then(function(resp){ return resp.json()})
        .then(function(data){
            current_temperature = data.current.temperature_2m;
            weather_text_elem.textContent = `${Math.round(current_temperature)} °C`;
            weather_code = data.current.weather_code;
            weather_icon_elem.src = weather_interpretation_codes[weather_code]
        })
        .catch(function(e){
            console.log(e)
    })
}

//получить название города с помощью стороннего api
//ренедеринг всего сайта только после загрузки геолокации