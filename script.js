// script.js

const apiKey = "60cb745b0e064fabb81170634251409"; // <-- replace with your WeatherAPI key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Elements
const tempElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");
const timeElement = document.getElementById("localtime");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");
const uvElement = document.getElementById("uv");

// Air quality elements
const pm25Element = document.getElementById("pm25");
const pm10Element = document.getElementById("pm10");
const coElement = document.getElementById("co");

// old event listener 
// searchBtn.addEventListener("click", () => {
//   const city = cityInput.value.trim();
//   if (city === "") {
//     alert("Please enter a city name.");
//     return;
//   }
//   fetchWeather(city);
// });

// Function to trigger weather fetch
function popEffect() {

    // Button press animation
    searchBtn.style.transform = "scale(0.9)";
    setTimeout(() => {
        searchBtn.style.transform = "scale(1)";
    }, 150); // reset after 150ms

}



function handleSearch() {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("City name");
        return;
    }
    fetchWeather(city);
}

// Button click event
searchBtn.addEventListener("click", () => {
    handleSearch();
    popEffect();
});
// Enter key event
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSearch();
        popEffect();
    }
});



async function fetchWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update DOM with weather info
        tempElement.textContent = `${data.current.temp_c}°C`;
        locationElement.textContent = `${data.location.name}, ${data.location.country}`;
        timeElement.textContent = `Local Time: ${data.location.localtime}`;
        humidityElement.textContent = `${data.current.humidity}%`;
        windElement.textContent = `${data.current.wind_kph} km/h`;
        uvElement.textContent = data.current.uv;

        // Air Quality
        const airQuality = data.current.air_quality;
        pm25Element.textContent = airQuality.pm2_5.toFixed(1);
        pm10Element.textContent = airQuality.pm10.toFixed(1);
        coElement.textContent = airQuality.co.toFixed(1);

    } catch (error) {
        alert("Error fetching data: " + error.message);
    }
}
