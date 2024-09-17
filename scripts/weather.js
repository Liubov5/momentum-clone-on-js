let weather_text_elem = document.querySelector(".weather__text")
window.onload = async () => {
    let current_temperature;
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

    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)
        .then(function(resp){ return resp.json()})
        .then(function(data){
            current_temperature = data.current.temperature_2m;
            weather_text_elem.textContent = `${Math.round(current_temperature)} °C`;
        })
        .catch(function(e){
            console.log(e)
    })
}

//получить название города с помощью стороннего api
//ренедеринг всего сайта только после загрузки геолокации