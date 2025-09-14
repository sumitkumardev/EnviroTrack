// script.js

const apiKey = "60cb745b0e064fabb81170634251409"; // <-- replace with your WeatherAPI key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

// Elements
const tempElement = document.getElementById("temperature");
const locationElement = document.getElementById("location");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    // Update DOM
    tempElement.textContent = `${data.current.temp_c}°C`;
    locationElement.textContent = `${data.location.name}, ${data.location.country}`;
    humidityElement.textContent = `${data.current.humidity}%`;
    windElement.textContent = `${data.current.wind_kph} km/h`;

  } catch (error) {
    alert("Error fetching data: " + error.message);
  }
}
