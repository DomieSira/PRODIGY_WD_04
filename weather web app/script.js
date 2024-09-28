const apiKey = '987662df56b07a197d6009c348e7cf8b'; // Your OpenWeatherMap API key

document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const location = document.getElementById('locationInput').value;
  getWeatherByLocation(location);
});

document.getElementById('getCurrentLocationBtn').addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeatherByCoordinates(lat, lon);
    });
  } else {
    alert('Geolocation is not supported by this browser.');
  }
});

function getWeatherByLocation(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.log('Error fetching weather data: ', error));
}

function getWeatherByCoordinates(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => displayWeather(data))
    .catch(error => console.log('Error fetching weather data: ', error));
}

function displayWeather(data) {
  document.getElementById('locationName').innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById('weatherDescription').innerText = `Condition: ${data.weather[0].description}`;
  document.getElementById('temperature').innerText = `Temperature: ${data.main.temp} °C`;
  document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
  document.getElementById('windSpeed').innerText = `Wind Speed: ${data.wind.speed} m/s`;
}
