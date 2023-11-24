import {
  isWhitespacesOrEmpty,
  displayWarning,
  displayInfo,
  HideableElement,
} from './utils.js';
import { requestImages } from './pixabay-api.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  loader: new HideableElement(document.querySelector('.loader'), 'loader'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: new HideableElement(
    document.querySelector('.load-more'),
    'load-more'
  ),
  pageEnd: document.querySelector('.js-page-end'),
};

const gallery = new SimpleLightbox('.gallery .gallery__link', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});

const imagesPerPage = 40;
let searchQuery;
let currentPage = 0;

refs.loadMoreBtn.hide();
refs.loader.hide();

refs.form.addEventListener('submit', onSearchSubmit);
refs.loadMoreBtn.element.addEventListener('click', () =>
  fetchImages(searchQuery)
);

const observer = new MutationObserver(() => {
  setTimeout(scrollToEndSmooth, 700);
});

const mutationObserverConfig = { childList: true };
observer.observe(refs.gallery, mutationObserverConfig);

function onSearchSubmit(evt) {
  evt.preventDefault();

  const form = evt.currentTarget;
  const formData = new FormData(form);
  searchQuery = formData.get('searchQuery');
  // form.reset();

  if (isWhitespacesOrEmpty(searchQuery)) {
    displayWarning('Enter something');
    return;
  }

  currentPage = 0;
  clearGallery();
  fetchImages(searchQuery);
}

async function fetchImages(query) {
  try {
    refs.loader.show();
    refs.loadMoreBtn.hide();
    currentPage += 1;
    const response = await requestImages(query, currentPage, imagesPerPage);

    const images = response.data.hits;
    const totalImages = response.data.totalHits;

    if (images.length === 0) {
      displayInfo(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    renderImages(images);
    gallery.refresh();

    if (currentPage === 1) {
      displayInfo(`Hooray! We found ${totalImages} images.`);
    }

    if (
      images.length < imagesPerPage ||
      currentPage * imagesPerPage >= totalImages
    ) {
      refs.loadMoreBtn.hide();
      displayInfo("We're sorry, but you've reached the end of search results.");
      return;
    }

    refs.loadMoreBtn.show();
  } catch (error) {
    console.log(error);
  } finally {
    refs.loader.hide();
  }
}

function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
            <a class="gallery__link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <div class="info">
              <p class="info-item">
                  <b>Likes</b>
                  ${likes}
              </p>
              <p class="info-item">
                  <b>Views</b>
                  ${views}
              </p>
              <p class="info-item">
                  <b>Comments</b>
                  ${comments}
              </p>
              <p class="info-item">
            <b>Downloads</b>
            ${downloads}
              </p>
            </div>
       </div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function scrollToEndSmooth() {
  refs.pageEnd.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
