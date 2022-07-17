'use strict';

const searchInput = document.querySelector('.js_searchInput');
const searchBtn = document.querySelector('.js_searchBtn');
const resetBtn = document.querySelector('.js_resetBtn');
const resultUl = document.querySelector('.js_resultUl');
const favouritetUl = document.querySelector('.js_favouritetUl');
const iconRemove = document.querySelectorAll('.js_iconRemove');
const deleteFavBtn = document.querySelector('.js_deleteFavBtn');

let data = [];
let favourites = [];

function handleBtnReset(event) {
  event.preventDefault();
  searchInput.value = '';
  resultUl.innerHTML = '';
}
resetBtn.addEventListener('click', handleBtnReset);

function handleDeleteFav(event) {
  event.preventDefault();
  favourites.splice(0, favourites.length);
  renderAnimeFav();
}

deleteFavBtn.addEventListener('click', handleDeleteFav);

for (const eachIcon of iconRemove) {
  eachIcon.addEventListener('click', handleClickFav);
}

const renderAnimeFav = () => {
  let html = '';
  for (const eachFav of favourites) {
    html += `<li class="js_liAnime" id="${eachFav.mal_id}">`;
    html += `<img src="${eachFav.images.jpg.image_url}" alt="Imagen del anime ${eachFav.title}">`;
    html += `<div class="divFavourites">`;
    html += `<h2>${eachFav.title}</h2>`;
    html += `<i class="fa-solid fa-circle-xmark js_iconRemove"></i>`;
    html += `</div></li>`;
  }
  favouritetUl.innerHTML = html;
  listenerAnime();
  localStorage.setItem('favouritesLS', JSON.stringify(favourites));
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
      renderAnimeResult();
    });
}
searchBtn.addEventListener('click', handleClick);

function loadPage() {
  const FavLocalStorage = JSON.parse(localStorage.getItem('favouritesLS'));
  if (FavLocalStorage) {
    favourites = FavLocalStorage;
    renderAnimeFav();
  }
}
loadPage();
