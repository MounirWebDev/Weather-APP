const container = document.querySelector('.container');
const weatherInfoContainer = document.querySelector('.weatherInfoContainer');
const input = document.getElementById('searchInput');
const cityName = document.getElementById('cityName');
const temp = document.getElementById('temperature');
const humd = document.querySelector('#humidity span');
const wd = document.querySelector('#windSpeed span');
const wImg = document.getElementById('weatherImg');
const span = document.querySelector('.searchContainer span');
const searchIcon = document.getElementById('searchIcon');
const err = document.getElementById('error');

// START LOOKING FOR A COUNTRY
input.addEventListener('focus', () => {
    input.style.width = '200px';
    err.style.display = 'none';
    span.style.transform = 'rotate(0deg)';
});

// PUT THE COUNTRY IN THE API URL
function constructURL(country) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=d527f1d5e8f9569bdd32a741e12bea87&units=metric`;
}

async function getData(url) {
    try {
        const response = await fetch(url);
        if (response.status === 404) {
            container.style.width = '400px';
            setTimeout(() => {
                weatherInfoContainer.style.display = 'none';
                container.style.padding = '10px';
                container.style.flexDirection = 'row';
                container.style.alignItems = 'start';
                container.style.height = '50px';
            }, 500);
            setTimeout(() => {
                showError('Country Not Found. Please try again!');
            }, 700);
        } else {
            const data = await response.json();
            const {
                name: city,
                main: { temp: temperature, humidity },
                wind: { speed: windSpeed },
                weather: [{ main: weatherImg }],
            } = data;

            cityName.innerHTML = city;
            wImg.src = `./assets/images/${weatherImg.toLowerCase()}.png`;
            temp.innerHTML = `${Math.floor(temperature)}°c`;
            humd.innerHTML = `${humidity}%`;
            wd.innerHTML = `${windSpeed}km/h`;
            container.style.width = '425px';
            setTimeout(() => {
                container.style.height = '550px';
            }, 500);
            setTimeout(() => {
                container.style.padding = '0';
                container.style.flexDirection = 'column';
                container.style.alignItems = 'center';
                weatherInfoContainer.style.display = 'flex';
            }, 700);
        }
    } catch (error) {
        console.error('Error', error);
    }
}

// GET SEARCH'S INFO AND HANDEL IT
function handleSearch() {
    const country = input.value.trim();
    if (country) {
        const url = constructURL(country);
        getData(url);
    } else {
        container.style.width = '400px';
        setTimeout(() => {
            weatherInfoContainer.style.display = 'none';
            container.style.padding = '10px';
            container.style.flexDirection = 'row';
            container.style.alignItems = 'start';
            container.style.height = '50px';
        }, 500);
        setTimeout(() => {
            showError('Country Not Found. Please try again!');
        }, 700);
    }
}

// DISPLAY ERROR
function showError(errorMessage) {
    err.innerHTML = errorMessage;
    err.style.display = 'flex';
}

input.addEventListener('blur', () => {
    input.style.width = input.value ? '200px' : '100px';
    span.style.transform = input.value ? 'rotate(0)' : 'rotate(-360deg)';
});

// GET COUNTRY PRESSING ON ENTER KEY
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        handleSearch();
    }
    err.style.display = 'none';
});

// GET COUNTRY CLICKING ON SEARCH ICON
searchIcon.addEventListener('click', () => {
    handleSearch();
});

// DISPLAY ADDITIONAL INFORMATIONS
const menu = document.querySelector('.menu');
const close = document.querySelector('.close');
const ADC1 = document.querySelector('.additionalInfoContainer1');
const ADC2 = document.querySelector('.additionalInfoContainer2');

menu.addEventListener('click', () => {
    ADC1.style.right = 0;
    ADC2.style.left = 0;
});

close.addEventListener('click', () => {
    ADC1.style.right = '100%';
    ADC2.style.left = '100%';
});
