import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import './css/styles.css';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const catInfoEl = document.querySelector('.cat-info');

fetchBreeds()
  .then(response => {
    console.log(response);
    const { data } = response;
    return data;
  })
  .then(data => {
    catIdMarkup(data);
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(monitorCondition);

selectEl.addEventListener('change', onSelect);

function onSelect(evt) {
  errorEl.hidden = true;
  loaderEl.hidden = false;
  catInfoEl.hidden = true;
  const catId = evt.target.value;
  if (catId) {
    return fetchCatByBreed(catId)
      .then(response => {
        const { data } = response;
        return data;
      })
      .then(data => {
        loaderEl.hidden = true;
        catInfoEl.hidden = false;
        catMarkupImg(data);
      })
      .catch(monitorCondition);
  }
}

function monitorCondition() {
  selectEl.hidden = true;
  loaderEl.hidden = true;
  errorEl.hidden = false;
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'left-top',
    timeout: 4000,
    width: '400px',
    fontSize: '24px'
});
}

function catMarkupImg(data) {
  const markup = data
    .map(el => {
      return `
            <div class="box-img">
            <img src="${el.url}" alt="${el.breeds[0].name}" width="400" height="300" /> 
            <h2>${el.breeds[0].name}</h2>
            <p>${el.breeds[0].description}</p>
            <p><b>Temperament:</b> ${el.breeds[0].temperament}</p>
            </div>
            `;
    })
    .join('');

  catInfoEl.innerHTML = markup;
}

function catIdMarkup(data) {
  data.map(cat => {
    selectEl.insertAdjacentHTML(
      'beforeend',
      `<option value="${cat.id}">${cat.name}</option>`
    );
  });
}
