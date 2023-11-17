~

document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    getWeather();
});

async function getWeather() {
    const apiKey = '364e2b74ae194d7087664153231711'; 
    const city = document.querySelector('.search').value;
    const weatherInfo1 = document.querySelector('.enter');
    const weatherInfo = document.querySelector('.weather');
    const weatherInfo3 = document.querySelector('.promt');

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            weatherInfo1.style.display = 'none';
            weatherInfo.style.display = 'flex';
            weatherInfo3.style.display = 'none';

            document.getElementById('block1').innerHTML = `
                <h5>${data.location.name}, ${data.location.country}</h5>
                <p>${new Date(data.location.localtime).toDateString()}</p>
                <p>${new Date(data.location.localtime).toLocaleTimeString()}</p>
            `;

            document.getElementById('block2').innerHTML = `
                <p class="img_sun">
                    <img class="sun" src='https:${data.current.condition.icon}' alt="weather icon">
                    <span class="number">${data.current.temp_c}°C</span>
                </p>
                <p class="word_sun">${data.current.condition.text}</p>
            `;

            document.getElementById('block3').innerHTML = `
                <p>Feels like: ${data.current.feelslike_c}°C</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind: ${data.current.wind_kph} kph</p>
            `;
        } else {
            weatherInfo1.style.display = 'none';
            weatherInfo.style.display = 'none';
            weatherInfo3.style.display = 'block';

            document.querySelector('.promt p').textContent = `Error: ${data.error.message}`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}