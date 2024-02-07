import{i as c,S as u}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const d=document.querySelector("#search-form"),a=document.querySelector(".gallery"),l={key:"42183789-4564ae77348bbdba9cab87cc0",image_type:"photo",orientation:"horizontal",safesearch:!0,q:""};d.addEventListener("submit",n=>{n.preventDefault();const r=document.querySelector("#query").value;l.q=r,h().then(s=>f(s)).catch(s=>console.log(s)),n.target.reset()});function h(){const n=new URLSearchParams(l);return fetch(`https://pixabay.com/api/?${n}`).then(r=>{if(r.ok)return r.json();throw new Error(r.status)})}function f(n){if(n.hits.length===0)c.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FFFFFF",backgroundColor:"#EF4040",position:"topRight",messageSize:"16px",messageLineHeight:"24px",maxWidth:"432px"}),a.innerHTML="";else{const s=n.hits.map(o=>`<a class="gallery-link" href="${o.largeImageURL}">
        <img class="gallery-image"
        src="${o.webformatURL}"
        alt="${o.tags}">
         </a>
        <div class="img-content">
        <div>
        <h3>Likes</h3>
        <p>${o.likes}</p>
        </div>

        <div>
        <h3>Views</h3>
        <p>${o.views}</p>
        </div>

        <div>
        <h3>Comments</h3>
        <p>${o.comments}</p>
        </div>

        <div>
        <h3>Downloads</h3>
        <p>${o.downloads}</p>
        </div>
        </div>
        `).join("");a.innerHTML=s}new u(".gallery-link").refresh()}
//# sourceMappingURL=commonHelpers.js.map
