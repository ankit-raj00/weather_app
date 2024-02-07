let isFahrenheit = true;

function handleInputChange() {
  const getWeatherButton = document.getElementById('getWeatherButton');
  const cityInput = document.getElementById('cityInput');
  getWeatherButton.style.opacity = cityInput.value ? 1 : 0.5;
  getWeatherButton.disabled = cityInput.value ? false : true;
  getWeatherButton.classList.toggle('disabled-button', !cityInput.value);
  getWeatherButton.classList.toggle('active-button', cityInput.value);
  getWeatherButton.classList.toggle('blue-button', false);
}

async function getWeather() {
  const cityInput = document.getElementById('cityInput');
  const weatherInfoContainer = document.getElementById('weatherInfo');
  const weatherIcon = document.getElementById('weatherIcon');
  const toggleButton = document.getElementById('toggleButton');
  const apiKey = '6c1da8b27bmshb4c78a48651ef78p15fc8ejsna8bcdb0753c9'; // Replace with your actual RapidAPI key

  const city = cityInput.value;
  const temperatureUnit = isFahrenheit ? 'imperial' : 'metric';
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}&unit=${temperatureUnit}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.ok) {
      displayWeather(result);
      toggleButton.style.pointerEvents = 'auto';
      toggleButton.classList.add('green-button');
      toggleButton.classList.add('visible');
      document.getElementById('getWeatherButton').classList.add('blue-button');
    } else {
      console.error('Error:', response.status, result);
      weatherInfoContainer.innerHTML = 'Enter Valid City Name';
      weatherIcon.src = '';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherInfoContainer.innerHTML = 'Enter Valid City Name';
    weatherIcon.src = '';
  }
}

function displayWeather(data) {
  const weatherInfoContainer = document.getElementById('weatherInfo');
  const weatherIcon = document.getElementById('weatherIcon');

  weatherInfoContainer.innerHTML = `
    <div class="weather-data-item"><strong>Temperature:</strong> ${data.temp}°${isFahrenheit ? 'F' : 'C'}</div>
    <div class="weather-data-item"><strong>Humidity:</strong> ${data.humidity}%</div>
    <div class="weather-data-item"><strong>Wind Speed:</strong> ${data.wind_speed} m/s</div>
  `;
}

function toggleTemperature() {
  isFahrenheit = !isFahrenheit;
  getWeather();
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    document.getElementById('getWeatherButton').click();
  }
}
