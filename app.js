let id = '8750894c27644acf096f5d68a5e2026e';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
let city = document.querySelector('.name');
let form = document.querySelector("form");
let temperature = document.querySelector('.temperature');
let description = document.querySelector('.description');
let valueSearch = document.getElementById('name');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let windspeed = document.getElementById('windspeed');
let pressure = document.getElementById('pressure');
let main = document.querySelector('main');
let body = document.body;  // To change the background
let isCelsius = true; // Default unit is Celsius
let currentTemp = null; // Store the current temperature

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (valueSearch.value != '') {
        searchWeather();
    }
});

// Event listener for the toggle switch to change temperature units
document.getElementById('toggle-temp').addEventListener('change', (e) => {
    isCelsius = !isCelsius;  // Toggle between Celsius and Fahrenheit
    updateTemperature(currentTemp); // Update the temperature display
    updateLabels(isCelsius); // Update the labels ("C" or "F")
});

// Function to search weather based on city name
const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector('figcaption').innerHTML = data.name;
                city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                description.innerText = data.weather[0].description;

                clouds.innerText = `Clouds: ${data.clouds.all}%`;
                humidity.innerText = `Humidity: ${data.main.humidity}%`;
                windspeed.innerText = `${data.wind.speed} km/h`;
                pressure.innerText = `Pressure: ${data.main.pressure} hPa`;

                currentTemp = data.main.temp; // Store the temperature
                updateTemperature(currentTemp); // Update the temperature display

                changeBackground(data.weather[0].main); // Change background based on weather condition
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        });
}

// Function to update temperature based on the selected unit
const updateTemperature = (temp) => {
    let displayTemp = isCelsius ? temp : convertToFahrenheit(temp);
    temperature.querySelector('span').innerText = `${displayTemp.toFixed(1)}°${isCelsius ? 'C' : 'F'}`;
}

// Function to update the labels for Celsius and Fahrenheit
const updateLabels = (isCelsius) => {
    const labelOff = document.querySelector('.label-off');
    const labelOn = document.querySelector('.label-on');
    if (isCelsius) {
        labelOff.style.opacity = '1';
        labelOn.style.opacity = '0';
    } else {
        labelOff.style.opacity = '0';
        labelOn.style.opacity = '1';
    }
}

// Function to convert Celsius to Fahrenheit
const convertToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
}

// Function to change the background image based on weather conditions
// Function to change the background image based on weather conditions
const changeBackground = (weatherMain) => {
    let imageUrl = '';
    
    // Set image URL based on weather condition
    switch (weatherMain.toLowerCase()) {
        case 'clear':
            imageUrl = "url('6.jpg')"; 
            break;
        case 'clouds':
            imageUrl = "url('4.webp')"; 
            break;
        case 'rain':
            imageUrl = "url('8.avif')"; 
            break;
        case 'snow':
            imageUrl = "url('5.jpg')"; 
            break;
        case 'thunderstorm':
            imageUrl = "url('3.jpg')"; 
            break;
        default:
            imageUrl = "url('7.jpg')"; 
            break;
    }

    // Apply the image with full-screen coverage
    body.style.backgroundImage = imageUrl;
    body.style.backgroundSize = 'cover';      // Ensures the image covers the entire screen
    body.style.backgroundPosition = 'center'; // Centers the image
    body.style.backgroundAttachment = 'fixed'; // Ensures the image stays fixed while scrolling
    body.style.backgroundRepeat = 'no-repeat'; // Prevents image repetition
}


// Function to get user's current location and fetch weather
const getLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(url + '&lat=' + lat + '&lon=' + lon)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.cod == 200) {
                        city.querySelector('figcaption').innerHTML = data.name;
                        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                        description.innerText = data.weather[0].description;

                        clouds.innerText = `Clouds: ${data.clouds.all}%`;
                        humidity.innerText = `Humidity: ${data.main.humidity}%`;
                        windspeed.innerText = `${data.wind.speed} km/h`;
                        pressure.innerText = `Pressure: ${data.main.pressure} hPa`;

                        currentTemp = data.main.temp; // Store the temperature
                        updateTemperature(currentTemp); // Update the temperature display

                        changeBackground(data.weather[0].main); // Change background based on weather condition
                    }
                })
        })
    }
}

getLocationWeather();
