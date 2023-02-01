console.log(`hi`);

const API_URL =
  "https://api.openweathermap.org/data/3.0/onecall?lat=41.99646&lon=21.43141&units=metric&exclude=minutely&appid=83cf676a48739fd57b023a3d32f2ef8b";

fetch(API_URL)
  .then((res) => res.json())
  .then((data) => {
    const homeBtn = document.querySelector(`.home-btn`);
    const aboutBtn = document.querySelector(`.about-btn`);
    const hourlyBtn = document.querySelector(`.hourly-btn`);
    const mainEl = document.querySelector(`main`);

    const renderHomePage = (mainEl, data) => {
      const currentDate = new Date(data.current.dt * 1000);

      mainEl.innerHTML = "";
      mainEl.innerHTML = `<div class="current-container">
  <div class="left-side">
    <div class="location">
      <h3>${data.timezone}</h3>
      <img
        src="http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png"
        alt=""
        width="220px"
      />
    </div>
    <div class="line"></div>
    <div class="left-side-content">
      <h1>${data.current.temp}°C</h1>
      <h5>${data.current.weather[0].description}</h5>
    </div>
  </div>
  <div class="right-side">
    <h3>Weather Next 7 Days</h3>
    <div class="right-side-content">
      <div class="day-card-container">

      </div>
      <div class="line"></div>
      <h5 class="min-temp">Feels Like: ${data.current.feels_like}</h5>
      <h5 class="wind-speed">Wind speed: ${data.current.wind_speed}km/h</h5>
      <h5 class="humidity">Humidity: ${data.current.humidity}%</h5>
    </div>
  </div>
</div>
`;
      let dailyHTML = "";
      for (let el of data.daily) {
        const dailyDate = new Date(el.dt * 1000);

        dailyHTML += `
    <div class="day-card">
    <p>${dailyDate.toLocaleDateString("fr")}</p>
    <img src="http://openweathermap.org/img/wn/${
      el.weather[0].icon
    }@2x.png" alt=""
    width="45px">
    <p>${el.weather[0].description}</p>
    <p class="min-temp">Min:${el.temp.min}°C</p>
    <p class="max-temp">Min:${el.temp.max}°C</p>
    <p class="humidity">Humidity: ${el.humidity}%</p>
  </div> `;
      }

      document.querySelector(".day-card-container").innerHTML = dailyHTML;
    };

    const renderAboutPage = (mainEl) => {
      mainEl.innerHTML = "";
      mainEl.innerHTML = `      <div class="about-box">
  <div class="about-container">
    <h1>Aleksandar Dimov</h1>
    <img src="./assets/person.png" alt="person image" />
    <p>Hello, my name is Aleksandar im 19 years old and im student at the SEDC Acedemy for programming and this is my Weather App.</p>
    <a href="https://github.com/mvd7" target="_blank">Click here for my GitHub repository</a>
</div>`;
    };

    const renderHourlyPage = (mainEl, data) => {
      mainEl.innerHTML = `<div class="hourly-box"><h1>Hourly Weather</h1>
  <div class="hourly-container"></div></div>
  `;
      let hourlyHTML = ``;
      for (let el of data.hourly) {
        const dailyDate = new Date(el.dt * 1000);
        hourlyHTML += `
    <div class="day-card">
          <p class="clock">${dailyDate.toLocaleTimeString("fr")}</p>
          <img
            src="http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png"
            alt=""
            width="45px"
          />
          <p>${el.temp}°C</p>
          <p class="min-temp">Feels Like: ${el.feels_like}</p>
          <p class="humidity">Humidity: ${el.humidity}</p>
          <p>${el.weather[0].description}</p>
        </div>
    `;
      }
      document.querySelector(`.hourly-container`).innerHTML = hourlyHTML;
    };

    hourlyBtn.addEventListener("click", () => {
      renderHourlyPage(mainEl, data);
    });

    homeBtn.addEventListener("click", () => {
      renderHomePage(mainEl, data);
    });

    aboutBtn.addEventListener("click", () => {
      renderAboutPage(mainEl);
    });
    window.onload(renderHomePage(mainEl, data));
  });
