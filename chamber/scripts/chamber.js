const cards = document.querySelector('#cards');

const displayData = (companies) => {
    companies.forEach((business) => {
        let card = document.createElement('section');
        card.classList.add("js-cards")
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
}

async function fetchData() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayData(data.companies);
}

document.addEventListener("DOMContentLoaded", () => {
    const modified = document.getElementById("lastModified");
    if (modified) {
        modified.textContent = "Last modified: " + document.lastModified;
    }
});

function setView(view) {
    const container = document.getElementById("cards");
    if (view === 'grid') {
        container.classList.remove('list-view')
        container.classList.add('grid-view')
    }
    else if (view === 'list') {
        container.classList.add('list-view')
        container.classList.remove('grid-view')
    }

}

document.addEventListener('DOMContentLoaded', () => {
    setView('grid')
});

fetchData();