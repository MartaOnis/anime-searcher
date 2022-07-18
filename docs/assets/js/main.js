"use strict";const searchInput=document.querySelector(".js_searchInput"),searchBtn=document.querySelector(".js_searchBtn"),resetBtn=document.querySelector(".js_resetBtn"),resultUl=document.querySelector(".js_resultUl"),favouritetUl=document.querySelector(".js_favouritetUl"),deleteFavBtn=document.querySelector(".js_deleteFavBtn"),msgSearch=document.querySelector(".js_msgSearch");let results=[],favourites=[];const renderAnimeFav=()=>{let e="";for(const t of favourites)e+=`<li class="js_liFav liFav" id="${t.id}">`,e+=`<img src="${t.img}" alt="Imagen del anime ${t.title}" class="imgFav">`,e+='<div class="divFavourites">',e+=`<h2 class="h2Fav">${t.title}</h2>`,e+=`<img src="./assets/images/cancelar.png" class="js_iconRemove iconFav" name="${t.id}">`,e+="</div></li>";favouritetUl.innerHTML=e,listenerAnime(),listenerIconFav(),localStorage.setItem("favouritesLS",JSON.stringify(favourites))},renderAnimeResult=()=>{let e="",t="";for(const n of results){t=-1!==favourites.findIndex(e=>n.id===e.id)?"favourite":"",e+=`<li class="js_liAnime ${t} liResults" id="${n.id}">`,"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"!==n.img?e+=`<img src="${n.img}" alt="Imagen del anime ${n.title}" class="imgRes">`:e+='<img src="https://via.placeholder.com/200x250/ea7b7b/2f2d2d/?text=SIN IMAGEN" alt="No hay imagen disponible">',e+=`<h2 class="${t}__title" h2Res>${n.title}</h2>`,e+="</li>"}resultUl.innerHTML=e,listenerAnime(),listenerIconFav()},getDataApi=()=>{const e=searchInput.value;fetch("https://api.jikan.moe/v4/anime?q="+e).then(e=>e.json()).then(e=>{results=e.data.map((function(e){return{img:e.images.jpg.image_url,title:e.title,id:e.mal_id}})),msgSearch.classList.add("hidden"),renderAnimeResult()})};function handleBtnReset(e){e.preventDefault(),searchInput.value="",resultUl.innerHTML=""}function handleDeleteAllFav(e){e.preventDefault(),favourites.splice(0,favourites.length),renderAnimeFav(),""!==resultUl.innerHTML&&renderAnimeResult()}function handleRemoveFav(e){const t=parseInt(e.currentTarget.name),n=favourites.findIndex(e=>e.id===t);favourites.splice(n,1),renderAnimeFav(),""!==resultUl.innerHTML&&renderAnimeResult()}function handleClickFav(e){const t=parseInt(e.currentTarget.id),n=results.find(e=>e.id===t),i=favourites.findIndex(e=>e.id===t);-1===i?favourites.push(n):favourites.splice(i,1),renderAnimeFav(),renderAnimeResult()}function handleClickSearch(e){e.preventDefault(),""===searchInput.value?(msgSearch.classList.remove("hidden"),resultUl.innerHTML=""):getDataApi()}resetBtn.addEventListener("click",handleBtnReset),deleteFavBtn.addEventListener("click",handleDeleteAllFav);const listenerIconFav=()=>{const e=document.querySelectorAll(".js_iconRemove");for(const t of e)t.addEventListener("click",handleRemoveFav)},listenerAnime=()=>{const e=document.querySelectorAll(".js_liAnime");for(const t of e)t.addEventListener("click",handleClickFav)};searchBtn.addEventListener("click",handleClickSearch);const loadPage=()=>{const e=JSON.parse(localStorage.getItem("favouritesLS"));e&&(favourites=e,renderAnimeFav())};loadPage();