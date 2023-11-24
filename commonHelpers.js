import{i as h,a as m,S as b}from"./assets/vendor-da648799.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const v=o=>!/[^ \t\r\n\v\f]/.test(o);function w(o,e=""){h.warning({title:e,message:o})}function d(o,e=""){h.info({title:e,message:o})}class f{constructor(e,s,a="hidden"){this.elementInstance=e,this.visibleClass=s,this.hiddenClass=a}show(){this.elementInstance.classList.replace(this.hiddenClass,this.visibleClass)}hide(){this.elementInstance.classList.replace(this.visibleClass,this.hiddenClass)}get element(){return this.elementInstance}}const L="40870788-52c67d6ee188ca20694b5c2b3";m.defaults.baseURL="https://pixabay.com/api";m.defaults.timeout=3e3;const I=m.create();async function S(o,e=1,s=20){return await I.get("/",{params:{key:L,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:e,per_page:s}})}const n={form:document.querySelector(".search-form"),loader:new f(document.querySelector(".loader"),"loader"),gallery:document.querySelector(".gallery"),loadMoreBtn:new f(document.querySelector(".load-more"),"load-more"),pageEnd:document.querySelector(".js-page-end")},E=new b(".gallery .gallery__link",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"}),u=40;let c,l=0;n.loadMoreBtn.hide();n.loader.hide();n.form.addEventListener("submit",q);n.loadMoreBtn.element.addEventListener("click",()=>g(c));const M=new MutationObserver(()=>{setTimeout($,700)}),P={childList:!0};M.observe(n.gallery,P);function q(o){o.preventDefault();const e=o.currentTarget;if(c=new FormData(e).get("searchQuery"),v(c)){w("Enter something");return}l=0,k(),g(c)}async function g(o){try{n.loader.show(),n.loadMoreBtn.hide(),l+=1;const e=await S(o,l,u),s=e.data.hits,a=e.data.totalHits;if(s.length===0){d("Sorry, there are no images matching your search query. Please try again.");return}if(C(s),E.refresh(),l===1&&d(`Hooray! We found ${a} images.`),s.length<u||l*u>=a){n.loadMoreBtn.hide(),d("We're sorry, but you've reached the end of search results.");return}n.loadMoreBtn.show()}catch(e){console.log(e)}finally{n.loader.hide()}}function C(o){const e=o.map(({webformatURL:s,largeImageURL:a,tags:t,likes:r,views:i,comments:p,downloads:y})=>`<div class="photo-card">
            <a class="gallery__link" href="${a}">
            <img src="${s}" alt="${t}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                  <b>Likes</b>
                  ${r}
              </p>
              <p class="info-item">
                  <b>Views</b>
                  ${i}
              </p>
              <p class="info-item">
                  <b>Comments</b>
                  ${p}
              </p>
              <p class="info-item">
            <b>Downloads</b>
            ${y}
              </p>
            </div>
       </div>`).join("");n.gallery.insertAdjacentHTML("beforeend",e)}function $(){n.pageEnd.scrollIntoView({behavior:"smooth",block:"end"})}function k(){n.gallery.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
