'use strict';

const searchInput = document.querySelector('.js_searchInput');
const searchBtn = document.querySelector('.js_searchBtn');
const resetBtn = document.querySelector('.js_resetBtn');
const resultUl = document.querySelector('.js_resultUl');
const favouriteUl = document.querySelector('.js_favouriteUl');
const deleteFavBtn = document.querySelector('.js_deleteFavBtn');
const msgSearch = document.querySelector('.js_msgSearch');
const Urlchange =
  'https://via.placeholder.com/80x110/C05340/272524/?text=SIN IMAGEN';

let results = [];
let favourites = [];
