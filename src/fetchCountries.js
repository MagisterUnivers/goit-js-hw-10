import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const baseUrla = 'https://restcountries.com';
const nameUrla = '/v3.1/name/';
const inputEl = document.getElementById('search-box');
const ulEl = document.querySelector('.country-list');
const mainDiv = document.querySelector('.country-info');

export async function fetchCountries(baseUrla) {
  try {
    const response = await fetch(`${baseUrla}`);
    if (response.ok) {
      const resultData = await response.json();
      return resultData;
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    Notiflix.Notify.failure(`No countrys was found: ${error}`);
    ulEl.innerHTML = '';
    mainDiv.innerHTML = '';
    return error;
  }
}
