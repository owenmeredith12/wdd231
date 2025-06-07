
async function fetchData() {
    const cardsContainer = document.querySelector("#cards");
    if (!cardsContainer) return;

    const response = await fetch("data/members.json");
    const data = await response.json();
    displayData(data.companies);
}

const displayData = (companies) => {
    const cards = document.querySelector('#cards');
    if (!cards) return;

    companies.forEach((business) => {
        let card = document.createElement('section');
        card.classList.add("js-cards");

        let fullName = document.createElement('h3');
        let picture = document.createElement('img');

        fullName.textContent = `${business.name}`;

        picture.setAttribute('src', business.image);
        picture.setAttribute('alt', `Picture of business ${business.name}`);
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('width', '10%');

        card.appendChild(fullName);
        card.appendChild(picture);
        cards.appendChild(card);
    });
};


document.addEventListener("DOMContentLoaded", () => {
    const modified = document.getElementById("lastModified");
    if (modified) {
        modified.textContent = "Last modified: " + document.lastModified;
    }
    fetchData();
});

function setView(view) {
    const container = document.getElementById("cards");
    if (!container) return;

    if (view === 'grid') {
        container.classList.remove('list-view');
        container.classList.add('grid-view');
    } else if (view === 'list') {
        container.classList.add('list-view');
        container.classList.remove('grid-view');
    }
}
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const day1Weather = document.querySelector('#day1');
const day2Weather = document.querySelector('#day2');
const day3Weather = document.querySelector('#day3');


const url = 'https://api.openweathermap.org/data/2.5/weather?lat=40.2464624&lon=-111.6454514&appid=01bffa42930123f47d3c44df9c76dadf&units=imperial'
const forecasturl = 'https://api.openweathermap.org/data/2.5/forecast?lat=40.2464624&lon=-111.6454514&appid=e11938a1cd5945537f982e0ffc660c33&units=imperial&cnt=20'

async function fetchCurrentWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        }

        else {
            throw Error(await response.text());
        }

    }

    catch (error) {
        console.log(error);
    }
}

async function fetchForecastWeather(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        }

        else {
            throw Error(await response.text());
        }

    }

    catch (error) {
        console.log(error);
    }
}

function getDays() {
    const day1 = new Date();
    const day1Index = (day1.getDay() + 1) % 7;
    const day2Index = (day1.getDay() + 2) % 7;
    const day3Index = (day1.getDay() + 3) % 7;
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day1Day = days[day1Index]
    const day2Day = days[day2Index];
    const day3Day = days[day3Index];
    return [day1Day, day2Day, day3Day];

}


function displayCurrentWeather(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    // weatherIcon.setAttribute('width', '75%');
    captionDesc.textContent = `${desc}`;
}

function displayForecast(data) {
    result = getDays();
    day1day = result[0];
    day2day = result[1];
    day3day = result[2];
    day1Weather.innerHTML = `${day1day}: ${data.list[0].main.temp}`
    day2Weather.innerHTML = `${day2day}: ${data.list[8].main.temp}`
    day3Weather.innerHTML = `${day3day}: ${data.list[16].main.temp}`

}

const spotlightCards = document.querySelector('#spotlight-articles');

const displaySpotlight = (data) => {
    const validCompanies = data.companies.filter(company => company.membershipLevel >= 2);

    const shuffled = validCompanies.sort(() => 0.5 - Math.random());

    const spotlightCompanies = shuffled.slice(0, 3);

    spotlightCompanies.forEach((company, index) => {
        const card = document.querySelector(`#company${index + 1}`);
        const title = document.createElement('h2');
        const picture = document.createElement('img');
        const phone = document.createElement('p');
        const address = document.createElement('p');
        const website = document.createElement('p');
        const membership = document.createElement('p');

        title.innerHTML = company.name;
        picture.setAttribute('src', company.image);
        picture.setAttribute('alt', `Picture of business ${company.name}`);
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('width', '30%');
        phone.textContent = company.phone;
        address.textContent = company.address;
        website.innerHTML = `<a href="${company.website}" target="_blank">${company.website}</a>`;
        membership.textContent = `Membership Level: ${company.membershipLevel}`;

        card.appendChild(title);
        card.appendChild(picture);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(website);
        card.appendChild(membership);
    });
}

async function fetchSpotlight() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displaySpotlight(data);
}


document.addEventListener('DOMContentLoaded', () => {
    setView('grid')
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".modal-btn");
    const modals = document.querySelectorAll(".modal");
    const closeBtns = document.querySelectorAll(".modal .close");


    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "block";
            }
        });
    });

    closeBtns.forEach(close => {
        close.addEventListener("click", () => {
            close.closest(".modal").style.display = "none";
        });
    });


    window.addEventListener("click", event => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('data/pois.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(cardsData => {
            const container = document.getElementById('poi-cards');

            cardsData.forEach((card, index) => {
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card', `${index + 1}`);

                const title = document.createElement('h2');
                title.textContent = card.title;

                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = card.image;
                img.alt = card.title;
                figure.appendChild(img);

                const address = document.createElement('address');
                address.textContent = card.address;

                const description = document.createElement('p');
                description.textContent = card.description;

                const button = document.createElement('button');
                button.textContent = "Learn More";

                cardDiv.appendChild(title);
                cardDiv.appendChild(figure);
                cardDiv.appendChild(address);
                cardDiv.appendChild(description);
                cardDiv.appendChild(button);

                container.appendChild(cardDiv);
            });
        })
        .catch(error => console.error('Error fetching JSON data:', error));
});

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();

    if (!lastVisit) {
        sidebar.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const diffTime = now - lastVisitDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 1) {
            sidebar.textContent = "Back so soon! Awesome!";
        } else {
            sidebar.textContent = `You last visited ${diffDays} day${diffDays === 1 ? '' : 's'} ago.`;
        }
    }

    localStorage.setItem('lastVisit', now.toISOString());
});



fetchSpotlight();
fetchCurrentWeather(url);
fetchForecastWeather(forecasturl);
