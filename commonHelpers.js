(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();document.getElementById("search-form").addEventListener("submit",function(n){n.preventDefault();const o=document.getElementById("query").value.trim();if(!o){iziToast.warning({title:"Warning",message:"Please enter a search query."});return}a(o)});function a(n){const i=`https://pixabay.com/api/?key=42183789-4564ae77348bbdba9cab87cc0&q=${encodeURIComponent(n)}&image_type=photo&orientation=horizontal&safesearch=true`;iziToast.info({title:"Searching",message:"Fetching images...",timeout:!1,overlay:!0,id:"loading"}),fetch(i).then(t=>t.json()).then(t=>{l(t.hits),iziToast.destroy(document.querySelector(".iziToast-overlay"))}).catch(t=>{iziToast.error({title:"Error",message:"Failed to fetch images."}),console.error("Error fetching images:",t)})}function l(n){const o=document.getElementById("gallery");if(o.innerHTML="",n.length===0){iziToast.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!"});return}const i=document.createDocumentFragment();n.forEach(t=>{const e=document.createElement("div");e.className="image-card",e.innerHTML=`<a href="${t.largeImageURL}" data-lightbox="image-set" data-title="${t.tags}">
                            <img src="${t.webformatURL}" alt="${t.tags}">
                         </a>
                         <div class="info">Likes: ${t.likes}, Views: ${t.views}, Comments: ${t.comments}, Downloads: ${t.downloads}</div>`,i.appendChild(e)}),o.appendChild(i),new SimpleLightbox({elements:"#gallery a"}).refresh()}
//# sourceMappingURL=commonHelpers.js.map