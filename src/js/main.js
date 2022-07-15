'use strict';

// ELEMENTOS DEL HTML
const searchInput = document.querySelector('.js_searchInput');
const searchButton = document.querySelector('.js_searchButton');
const resetButton = document.querySelector('.js_resetButton');
const resultUl = document.querySelector('.js_resultUl');
const favouritetUl = document.querySelector('.js_favouritetUl');

let data = [];
const renderAnimeResult = () => {
  let html = '';
  for (const eachAnimeData of data) {
    html += `<li>`;
    html += `<img src="${eachAnimeData.images.jpg.image_url}" alt="${eachAnimeData.title}">`;
    html += `<h2>${eachAnimeData.title}</h2>`;
    html += `</li>`;
  }
  resultUl.innerHTML = html;
};

function handleClick(event) {
  event.preventDefault();
  const searchAnime = searchInput.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${searchAnime}`)
    .then((response) => response.json())
    .then((json) => {
      data = json.data;
      renderAnimeResult();
    });
}

searchButton.addEventListener('click', handleClick);
