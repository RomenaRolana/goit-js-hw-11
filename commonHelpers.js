import{S as d,i as a}from"./assets/vendor-46aac873.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();const f=document.querySelector("#search-form"),c=document.querySelector(".gallery"),i=document.querySelector(".loader");i.style.display="none";const u={key:"42183789-4564ae77348bbdba9cab87cc0",image_type:"photo",orientation:"horizontal",safesearch:!0,q:""};let h=new d(".gallery-link");f.addEventListener("submit",n=>{n.preventDefault(),c.innerHTML="",i.style.display="block";const r=document.querySelector("#query").value;u.q=r,y().then(t=>{m(t),h.refresh()}).catch(t=>{a.error({title:"Error",message:`An error occurred: ${t.message}`})}).finally(()=>{i.style.display="none"}),n.target.reset()});function y(){const n=new URLSearchParams(u);return fetch(`https://pixabay.com/api/?${n}`).then(r=>{if(r.ok)return r.json();throw new Error(`Failed to fetch: ${r.statusText}`)})}function m(n){if(n.hits.length===0)a.info({message:"Sorry, there are no images matching your search query. Please try again!"});else{const r=n.hits.map(t=>`
            <a class="gallery-link" href="${t.largeImageURL}">
                <img class="gallery-image" src="${t.webformatURL}" alt="${t.tags}">
            </a>
            <div class="img-content">
                <div><h3>Likes</h3><p>${t.likes}</p></div>
                <div><h3>Views</h3><p>${t.views}</p></div>
                <div><h3>Comments</h3><p>${t.comments}</p></div>
                <div><h3>Downloads</h3><p>${t.downloads}</p></div>
            </div>
        `).join("");c.innerHTML=r}}
//# sourceMappingURL=commonHelpers.js.map
