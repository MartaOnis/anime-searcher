'use strict';

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
  listenerIconFav();
  localStorage.setItem('favouritesLS', JSON.stringify(favourites));
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
  listenerIconFav();
};

const getDataApi = () => {
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
};
