'use strict';

const loadPage = () => {
  const FavLocalStorage = JSON.parse(localStorage.getItem('favouritesLS'));
  if (FavLocalStorage) {
    favourites = FavLocalStorage;
    renderAnimeFav();
  }
};
loadPage();
