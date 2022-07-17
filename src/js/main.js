'use strict';

const searchInput = document.querySelector('.js_searchInput');
const searchBtn = document.querySelector('.js_searchBtn');
const resetBtn = document.querySelector('.js_resetBtn');
const resultUl = document.querySelector('.js_resultUl');
const favouritetUl = document.querySelector('.js_favouritetUl');
const deleteFavBtn = document.querySelector('.js_deleteFavBtn');
let results = [];
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

function handleRemoveFav(event) {
  const iconRemove = parseInt(event.currentTarget.name);
  console.log(iconRemove);
  const favouriteOut = favourites.findIndex((fav) => fav.id === iconRemove);
  favourites.splice(favouriteOut, 1);
  renderAnimeFav();
  renderAnimeResult();
}

const listenerIcon = () => {
  const icons = document.querySelectorAll('.js_iconRemove');
  for (const eachIcon of icons) {
    eachIcon.addEventListener('click', handleRemoveFav);
  }
};
const renderAnimeFav = () => {
  let html = '';
  for (const eachFav of favourites) {
    html += `<li class="js_liFav" id="${eachFav.id}">`;
    html += `<img src="${eachFav.img}" alt="Imagen del anime ${eachFav.title}">`;
    html += `<div class="divFavourites">`;
    html += `<h2>${eachFav.title}</h2>`;
    html += `<img src="./assets/images/cancelar.png" class="js_iconRemove" name="${eachFav.id}"></i>`;
    html += `</div></li>`;
  }
  favouritetUl.innerHTML = html;
  listenerAnime();
  listenerIcon();
  localStorage.setItem('favouritesLS', JSON.stringify(favourites));
};

function handleClickFav(event) {
  const idSelect = parseInt(event.currentTarget.id);
  const animeClick = results.find((anime) => anime.id === idSelect);
  const favouriteClick = favourites.findIndex((fav) => fav.id === idSelect);
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
  for (const eachAnime of results) {
    const favouriteIndex = favourites.findIndex(
      (fav) => eachAnime.id === fav.id
    );
    if (favouriteIndex !== -1) {
      classFav = 'favourite';
    } else {
      classFav = '';
    }
    html += `<li class="js_liAnime ${classFav}" id="${eachAnime.id}">`;
    if (
      eachAnime.img !==
      'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
    ) {
      html += `<img src="${eachAnime.img}" alt="Imagen del anime ${eachAnime.title}">`;
    } else {
      html += `<img src="https://via.placeholder.com/200x200/ffffff/666666/?text=SIN IMAGEN" alt="No hay imagen disponible">`;
    }

    html += `<h2 class="${classFav}__title">${eachAnime.title}</h2>`;
    html += `</li>`;
  }
  resultUl.innerHTML = html;
  listenerAnime();
  listenerIcon();
};

function handleClick(event) {
  event.preventDefault();
  const searchAnime = searchInput.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${searchAnime}`)
    .then((response) => response.json())
    .then((json) => {
      results = json.data.map(function (elem) {
        let returnProp = {
          img: elem.images.jpg.image_url,
          title: elem.title,
          id: elem.mal_id,
        };
        return returnProp;
      });
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
