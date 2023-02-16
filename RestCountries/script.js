console.log(`???`);

const searchInput = document.querySelector(`#search-input`);
const searchBtn = document.querySelector(`.search-btn`);
const renderHTML = document.querySelector(`.data-container`);

function renderCountry(data) {
  renderHTML.innerHTML = `<div class="card-box">
  
  </div>`;
  const cardBox = document.querySelector(`.card-box`);

  cardBox.innerHTML += data
    .map(
      (data) =>
        `
  <div class="card-container">
    <img src="${data.flags.png}" alt="" width="250px"/>
    <h3>Name: ${data.name.common}</h3>
    <h3>Capital: ${data.capital}</h3>
    <h3>Population: ${data.population}</h3>
    <h3>Area: ${data.area}km²</h3>
    <h3>Languages: ${Object.values(data.languages)}</h3>
  </div>

    `
    )
    .join(``);
}

async function searchCountry() {
  const API_URL = `https://restcountries.com/v3.1/name/${searchInput.value}`;
  const spinner = document.querySelector(".lds-roller");

  spinner.style.display = `inline-block`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    renderCountry(data);
    console.log(data);
  } catch (error) {
    renderHTML.innerHTML += `<h1>There is no Country named "${searchInput.value}".</h1>`;
  } finally {
    spinner.style.display = "none";
  }
}

searchBtn.addEventListener(`click`, () => {
  searchCountry();
});
