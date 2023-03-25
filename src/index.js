import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const baseUrla = 'https://restcountries.com';
const nameUrla = '/v3.1/name/';
const inputEl = document.getElementById('search-box');
const ulEl = document.querySelector('.country-list');
const mainDiv = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  debounce(async e => {
    if (e.target.value.trim() != '') {
      mainDiv.innerHTML = '';
      ulEl.innerHTML = '';
      const data = await fetchCountries(
        `${baseUrla + nameUrla + e.target.value.trim()}`
      );

      console.log(data);

      if (data.length > 1 && data.length <= 10) {
        mainDiv.innerHTML = '';
        ulEl.innerHTML = data.map(elem => createCountry(elem)).join('');
        Notiflix.Notify.warning('Some country was found');
      } else if (data.length === 1) {
        ulEl.innerHTML = '';
        mainDiv.innerHTML = createMainCountry(data[0]);
        Notiflix.Notify.success('Search complete');
      } else if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    } else {
      mainDiv.innerHTML = '';
      ulEl.innerHTML = '';
    }
  }, DEBOUNCE_DELAY)
);

function createMainCountry(country) {
  // return `<img src ='${country.flags.png}' width='40px' heigth='40px'/><p>${
  //   country.capital[0]
  // }</p><p>${country.name.common}</p><p>${
  //   country.population
  // }</p><p>${Object.values(country.languages)}</p>`;

  return `<h2><img class="card__img" src="${
    country.flags.png
  }" width='40px' heigth='40px' alt="Flag of ${country.name.common}" /> ${
    country.name.common
  }</h2>
<ul>
  <li><b>Capital:</b> ${country.capital[0]}</li>
  <li><b>Population:</b> ${country.population}</li>
  <li><b>Languages:</b> ${Object.values(country.languages)}</li>
</ul>`;
}

function createCountry(country) {
  // return `<li>${country.name.common}</li>`
  return `<li class = "list__item"><img class='list__img' src="${country.flags.svg}" alt="Flag of ${country.name.common}" width = '40px' heigth = '40px'>  ${country.name.common}</li>`;
}

/**
  |============================
  | Custom OMEGA UNIQUE - REUSABLE FUNCTION
  |============================
*/

// async function fetchCountries(baseUrla) {
//   const response = await fetch(`${baseUrla}`);
//   const resultData = await response.json();
//   // .then(async response => {
//   //   if (!response.ok) {
//   //     throw new Error(response.status);
//   //   }
//   //   return await response.json();
//   // })
//   // .then(async data => {
//   //   resultData = data;
//   // })
//   // .catch(async error => {
//   //   return await error;
//   // });
//   return resultData;
// }

//  commit
