// OpenWeatherMap API. Do not share it publicly.
const api ='a8131dd5529f9e51cf975dc2e12ed4a9';

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location')
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');



window.addEventListener('load', () => {
    let long;
    let lat;

    // Accessing the Geolocation of the User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            // Storing the Longitude and Latitude in variables.
            long = position.coords.longitude
            lat = position.coords.latitude
            console.log(position)
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            console.log(base);

            // Using fetch to get the data
            fetch(base)
              .then((response) => {
                return response.json();
            })
              .then((data) => {
                const { temp } = data.main;
                const place = data.name;
                const { description, icon } = data.weather[0];
                const { sunrise, sunset } = data.sys;
              
                const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`
                const fahrenheit = (temp * 9) / 5 + 32;

                // Converting Epoch(Unix) time to GMT 
                const sunriseGMT = new Date(sunrise * 1000);
                const sunsetGMT = new Date(sunset * 1000);

                // Interacting with DOM to show data
                iconImg.src = iconURL;
                loc.textContent = `${place}`;
                desc.textContent = `${description}`;
                tempC.textContent = `${temp.toFixed(2)} °C`;
                tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
                sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
            });
            
        });
        
    }
    
});