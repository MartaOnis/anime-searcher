'use strict';

function handleBubble() {
  msgBubble.classList.toggle('hidden');
}

function handleBtnReset(event) {
  event.preventDefault();
  searchInput.value = '';
  resultUl.innerHTML = '';
}

function handleDeleteAllFav(event) {
  event.preventDefault();
  favourites.splice(0, favourites.length);
  renderAnimeFav();
  if (resultUl.innerHTML !== '') {
    renderAnimeResult();
  }
}

function handleRemoveFav(event) {
  const iconRemove = event.currentTarget.id;
  const favouriteOut = favourites.findIndex((fav) => fav.title === iconRemove);
  favourites.splice(favouriteOut, 1);
  renderAnimeFav();
  if (resultUl.innerHTML !== '') {
    renderAnimeResult();
  }
}

function handleAddFav(event) {
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

function handleClickSearch(event) {
  event.preventDefault();
  if (searchInput.value === '') {
    msgSearch.classList.remove('hidden');
    resultUl.innerHTML = '';
  } else {
    getDataApi();
  }
}
