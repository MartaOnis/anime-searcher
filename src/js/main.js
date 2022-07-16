'use strict';

// ELEMENTOS DEL HTML
const searchInput = document.querySelector('.js_searchInput');
const searchButton = document.querySelector('.js_searchButton');
const resetButton = document.querySelector('.js_resetButton');
const resultUl = document.querySelector('.js_resultUl');
const favouritetUl = document.querySelector('.js_favouritetUl');

let data = [];
let favourites = [];

//Traemos todos los li de resultados para hacer click en ellos y que ocurra algo (se añadan al array favoritos)

const renderAnimeFav = () => {
  let html = '';
  for (const eachFav of favourites) {
    html += `<li class="js_liAnime" id="${eachFav.mal_id}">`;
    html += `<img src="${eachFav.images.jpg.image_url}" alt="Imagen del anime ${eachFav.title}">`;
    html += `<h2>${eachFav.title}</h2>`;
    html += `</li>`;
  }
  favouritetUl.innerHTML = html;
  listenerAnime();
};

function handleClickFav(event) {
  const idSelect = parseInt(event.currentTarget.id);
  const animeClick = data.find((anime) => anime.mal_id === idSelect);
  const favouriteClick = favourites.findIndex((fav) => fav.mal_id === idSelect);
  if (favouriteClick === -1) {
    favourites.push(animeClick);
  } else {
    favourites.splice(favouriteClick, 1);
  }
  renderAnimeFav();
  renderAnimeResult();
}

const listenerAnime = () => {
  const liAnime = document.querySelectorAll('.js_liAnime');
  for (const li of liAnime) {
    li.addEventListener('click', handleClickFav);
  }
};
const renderAnimeResult = () => {
  let html = '';
  let classFav = '';
  for (const eachAnimeData of data) {
    const favouriteIndex = favourites.findIndex(
      (fav) => eachAnimeData.mal_id === fav.mal_id
    );
    if (favouriteIndex !== -1) {
      classFav = 'favourite';
    } else {
      classFav = '';
    }
    html += `<li class="js_liAnime ${classFav}" id="${eachAnimeData.mal_id}">`;
    if (
      eachAnimeData.images.jpg.image_url !==
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      html += `<img src="${eachAnimeData.images.jpg.image_url}" alt="Imagen del anime ${eachAnimeData.title}">`;
    } else {
      html += `<img src="https://via.placeholder.com/200x200/ffffff/666666/?text=SIN IMAGEN" alt="No hay imagen disponible">`;
    }

    html += `<h2 class="${classFav}__title">${eachAnimeData.title}</h2>`;
    html += `</li>`;
  }
  resultUl.innerHTML = html;
  listenerAnime();
};

function handleClick(event) {
  event.preventDefault();
  const searchAnime = searchInput.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${searchAnime}`)
    .then((response) => response.json())
    .then((json) => {
      data = json.data;
      console.log(data);
      renderAnimeResult();
    });
}

searchButton.addEventListener('click', handleClick);
