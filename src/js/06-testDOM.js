'use strict';

// const renderAnimeFav = () => {
//   let favouriteUl = document.querySelector('.js_favouriteUl');
//   favouriteUl = '';
//   console.log(favouriteUl);
//   for (const eachFav of favourites) {
//     const liElem = document.createElement('li');
//     liElem.classList.add('js_liFav', 'LiFav');
//     liElem.id = eachFav.id;

//     const imgElem = document.createElement('img');
//     if (
//       eachFav.img ===
//       'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png'
//     ) {
//       imgElem.src = Urlchange;
//     } else {
//       imgElem.src = eachFav.img;
//     }
//     imgElem.alt = eachFav.title;
//     imgElem.classList.add('imgFav');
//     liElem.appendChild(imgElem);

//     const divElem = document.createElement('div');
//     divElem.classList.add('divFavourites');
//     liElem.appendChild(divElem);

//     const h2Elem = document.createElement('h2');
//     const h2Text = document.createTextNode(eachFav.title);
//     h2Elem.appendChild(h2Text);
//     divElem.appendChild(h2Elem);

//     const iconElem = document.createElement('i');
//     iconElem.id = eachFav.title;
//     iconElem.classList.add(
//       'js_iconRemove',
//       'fa-solid',
//       'fa-2x',
//       'fa-circle-xmark',
//       'iconFav'
//     );
//     divElem.appendChild(iconElem);
//     favouriteUl.appendChild(liElem);
//   }
//   listenerAnime();
//   listenerIconFav();
//   localStorage.setItem('favouritesLS', JSON.stringify(favourites));
//   //location.reload(); en los EVENTOS
// };
