import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const refs = {
    searchCountryInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};



refs.searchCountryInput.addEventListener('input',
    debounce(onSearchInput, DEBOUNCE_DELAY)
  );


function onSearchInput(e) {
    const searchQuery = e.target.value.trim();

    if (searchQuery === '') {
        Notify.warning('Please start entering some country for searching');
        clearAllSearch();
        return;
}

fetchCountries(searchQuery)
    .then(countries => {
      
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearAllSearch();
      } else if (countries.length >= 2 && countries.length <= 10) {
        createCountriesList(countries);
        refs.countryInfo.innerHTML = '';
      } else if (countries.length === 1) {
        createOneCountryCard(countries);
        refs.countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      clearAllSearch();
    });

 }

 function clearAllSearch() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
  }

  function createOneCountryCard(countries) {
    const field = countries
    .map(country => {
      return `<li class="country-item">
            <img class="img" src="${country.flags.svg}" alt="Flag of ${country.name.official}">
            <h1 class="title">${country.name.official}</h1>
            </li>`;
    })
    .join('');
  refs.countryList.innerHTML = field;
  }

  function createCountriesList(countries) {
    const field = countries
    .map(country => {
      return `<div class="country"><img class="img" src="${country.flags.svg}"  alt="Flag of ${country.name.official}">
    <h1 class ="title">${country.name.official}</h1></div>
    <p class="text"><b>Capital:</b> ${country.capital}</p>
    <p class="text"><b>Population:</b> ${country.population}</p>
    <p class="text"><b>Languages:</b> ${Object.values(country.languages)}</p>`;
    })
    .join('');

  refs.countryInfo.innerHTML = field;
  
  }