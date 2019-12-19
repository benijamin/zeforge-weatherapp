// API key: b9d14019e09145a3c952a8276f548682

// Select all elements from .html file
const messageElement = document.querySelector(".message");
const iconElement = document.querySelector(".weather-icon");
const temperatureElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".weather-description p");
const locationElement = document.querySelector(".location h4");

// Application data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

// Application const
const KELVIN = 273;

// API key
const key = "b9d14019e09145a3c952a8276f548682";

// Check if current browser supports geolocation
if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    messageElement.style.display = "block";
    messageElement.innerHTML = "<p>Your browser doesn't support geolocation!</p>";
}

// Set user's position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show error if there is any issue with geolocation
function showError(error) {
    messageElement.style.display = "block";
    messageElement.innerHTML = `<p>${error.message}</p>`;
}

// Get weather information from API
function getWeather(latitude, longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${key}`;

    fetch(api)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        });
}

// Display weather info
function displayWeather() {
    iconElement.innerHTML = `<img src="img/icons/${weather.iconId}.png"/>`;
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descriptionElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Convert C [Celsius] to F [Fahrenheit]
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}

// Action when user click on the temperature element
temperatureElement.addEventListener("click", function() {
    if(weather.temperature.value === undefined) return;
        if(weather.temperature.unit === "celsius") {
            let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
            fahrenheit = Math.floor(fahrenheit);

            temperatureElement.innerHTML = `${fahrenheit}°<span>F</span>`;
            weather.temperature.unit = "fahrenheit";
        } else {
            temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
            weather.temperature.unit === "celsius";
        }
});