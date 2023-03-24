import './css/styles.css';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const baseUrla = 'https://restcountries.com';
const nameUrla = '/v3.1/name/';
const inputEl = document.getElementById('search-box');
const ulEl = document.querySelector('.country-list');
const mainDiv = document.querySelector('.country-info');

ulEl.innerHTML = '';
mainDiv.innerHTML = '';

inputEl.addEventListener('input', async e => {
  const data = await fetchCountries(`${baseUrla + nameUrla + e.target.value}`);

  console.log(data);

  if (data.length > 1 && data.length <= 10) {
    // data.name.common
    mainDiv.innerHTML = '';
    ulEl.innerHTML = data.map(elem => createCountry(elem)).join('');
  } else if (data.length == 1) {
    ulEl.innerHTML = '';
    mainDiv.innerHTML = createMainCountry(data[0]);
  }
});

function createMainCountry(country) {
  return `<img src ='${country.flags.png}' width='40px' heigth='40px'/><p>${
    country.capital[0]
  }</p><p>${country.name.common}</p><p>${
    country.population
  }</p><p>${Object.values(country.languages)}</p>`;
}

function createCountry(country) {
  return `<li>${country.name.common}</li>`;
}

async function fetchCountries(baseUrla) {
  const response = await fetch(`${baseUrla}`);
  const resultData = await response.json();
  // .then(async response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return await response.json();
  // })
  // .then(async data => {
  //   resultData = data;
  // })
  // .catch(async error => {
  //   return await error;
  // });
  return resultData;
}

// image name.common
// capital;
// population;
// languages;
