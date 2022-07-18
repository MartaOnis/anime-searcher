'use strict';

const searchInput = document.querySelector('.js_searchInput');
const searchBtn = document.querySelector('.js_searchBtn');
const resetBtn = document.querySelector('.js_resetBtn');
const resultUl = document.querySelector('.js_resultUl');
const favouritetUl = document.querySelector('.js_favouritetUl');
const deleteFavBtn = document.querySelector('.js_deleteFavBtn');

let results = [];
let favourites = [];
