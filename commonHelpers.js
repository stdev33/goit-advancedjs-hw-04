import{i as h,a as m,S as b}from"./assets/vendor-da648799.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const v=t=>!/[^ \t\r\n\v\f]/.test(t);function w(t,e=""){h.warning({title:e,message:t})}function d(t,e=""){h.info({title:e,message:t})}class f{constructor(e,s,a="hidden"){this.elementInstance=e,this.visibleClass=s,this.hiddenClass=a}show(){this.elementInstance.classList.replace(this.hiddenClass,this.visibleClass)}hide(){this.elementInstance.classList.replace(this.visibleClass,this.hiddenClass)}get element(){return this.elementInstance}}const L="40870788-52c67d6ee188ca20694b5c2b3";m.defaults.baseURL="https://pixabay.com/api";m.defaults.timeout=3e3;const I=m.create();async function S(t,e=1,s=20){return await I.get("/",{params:{key:L,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:s}})}const n={form:document.querySelector(".search-form"),loader:new f(document.querySelector(".loader"),"loader"),gallery:document.querySelector(".gallery"),loadMoreBtn:new f(document.querySelector(".load-more"),"load-more"),pageEnd:document.querySelector(".js-page-end")},C=new b(".gallery .gallery__link",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"}),u=40;let c,i=0;n.loadMoreBtn.hide();n.loader.hide();n.form.addEventListener("submit",q);n.loadMoreBtn.element.addEventListener("click",()=>g(c));const M=new MutationObserver(()=>{i>1&&setTimeout(B,700)}),P={childList:!0};M.observe(n.gallery,P);function q(t){t.preventDefault();const e=t.currentTarget;if(c=new FormData(e).get("searchQuery"),v(c)){w("Enter something");return}i=0,$(),g(c)}async function g(t){try{n.loader.show(),n.loadMoreBtn.hide(),i+=1;const e=await S(t,i,u),s=e.data.hits,a=e.data.totalHits;if(s.length===0){d("Sorry, there are no images matching your search query. Please try again.");return}if(E(s),C.refresh(),i===1&&d(`Hooray! We found ${a} images.`),s.length<u||i*u>=a){n.loadMoreBtn.hide(),d("We're sorry, but you've reached the end of search results.");return}n.loadMoreBtn.show()}catch(e){console.log(e)}finally{n.loader.hide()}}function E(t){const e=t.map(({webformatURL:s,largeImageURL:a,tags:r,likes:o,views:l,comments:y,downloads:p})=>`<div class="photo-card">
            <a class="gallery__link" href="${a}">
            <img src="${s}" alt="${r}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                  <b>Likes</b>
                  ${o}
              </p>
              <p class="info-item">
                  <b>Views</b>
                  ${l}
              </p>
              <p class="info-item">
                  <b>Comments</b>
                  ${y}
              </p>
              <p class="info-item">
            <b>Downloads</b>
            ${p}
              </p>
            </div>
       </div>`).join("");n.gallery.insertAdjacentHTML("beforeend",e)}function B(){const{height:t}=n.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function $(){n.gallery.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
