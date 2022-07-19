'use strict';

headerImg.addEventListener('mousemove', handleBubble);

resetBtn.addEventListener('click', handleBtnReset);

deleteFavBtn.addEventListener('click', handleDeleteAllFav);

const listenerIconFav = () => {
  const icons = document.querySelectorAll('.js_iconRemove');
  for (const eachIcon of icons) {
    eachIcon.addEventListener('click', handleRemoveFav);
  }
};

const listenerAnime = () => {
  const liAnime = document.querySelectorAll('.js_liAnime');
  for (const li of liAnime) {
    li.addEventListener('click', handleAddFav);
  }
};

searchBtn.addEventListener('click', handleClickSearch);
