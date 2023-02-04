console.log(`?`);

const STARWARS_URL = `https://swapi.dev/api/planets/?page=1`;
const STARWARS_URL2 = `https://swapi.dev/api/planets/?page=2`;

const btn = document.querySelector(`.btn`);
const mainEl = document.querySelector(`main`);

function fetchStarWars() {
  fetch(STARWARS_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderPlanets(mainEl, data);
    });
}

function fetchStarWarsNext() {
  fetch(STARWARS_URL2)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      renderPlanets(mainEl, data);
    });
}

function renderPlanets(mainEl, planetsData) {
  let tableContent = ``;
  const nextBtn = document.createElement("button");

  mainEl.innerHTML = `<table border="1" class="tableEl">
  <tr>
  <th>Planet Name</th>
  <th>Population</th>
  <th>Climate</th>
  <th>Gravity</th>
</tr>
  </table>
  `;

  for (let planet of planetsData.results) {
    tableContent += `
    <tr>
    <td>${planet.name}</td>
    <td>${planet.population}</td>
    <td>${planet.climate}</td>
    <td>${planet.gravity}</td>
  </tr>`;
  }
  document.querySelector(`.tableEl`).innerHTML += tableContent;
  mainEl.appendChild(nextBtn);
  mainEl.appendChild(btn);
  btn.innerText = `Previous`;
  nextBtn.innerText = `Next`;
  btn.addEventListener(`click`, fetchStarWars);
  nextBtn.addEventListener(`click`, fetchStarWarsNext);
}

btn.addEventListener(`click`, fetchStarWars);
