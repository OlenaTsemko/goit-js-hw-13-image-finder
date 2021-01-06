import 'intersection-observer';

import './sass/styles.scss';

import refs from './js/refs';
import imageCardMarkup from './js/makeMarkup';
import apiService from './js/apiService';

import loadMoreBtn from './js/components/load-more-btn';
import lasyLoadImages from './js/lazy-load';
import scrollTo from './js/components/scroll-to';

// import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';

import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

refs.searchForm.addEventListener('submit', searchFormSubmitHandler);
refs.btnLoadMore.addEventListener('click', btnLoadMoreHandler);
refs.galleryContainer.addEventListener('click', largeImageHandler);

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', debounce(scrollOnTopHandler, 500));

  // При клике прокручиываем на самый верх
  refs.scrollOnTopBtn.addEventListener('click', event => {
    event.preventDefault();
    scrollTo(0, 400);
  });
});

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  apiService.query = form.elements.query.value;

  clearGalleryContainer();

  apiService.resetPage();

  const height = 115;
  fetchCardList(height);

  form.reset();
}

function btnLoadMoreHandler() {
  const height = window.innerHeight - 115;
  fetchCardList(height);
}

function largeImageHandler(event) {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageUrl = event.target.dataset.largeImage;
  const largeImageAlt = event.target.alt;
  const modalTemplate = `<img src="${largeImageUrl}" alt="${largeImageAlt}" />`;

  const options = {
    onShow() {
      window.addEventListener('keydown', onEscHandler);
    },

    onClose() {
      window.removeEventListener('keydown', onEscHandler);
    },
  };

  function onEscHandler(event) {
    if (event.code === 'Escape') {
      imageInstance.close();
    }
  }

  const imageInstance = basicLightbox.create(modalTemplate, options);

  imageInstance.show();

  // console.dir(imageInstance);
}

function fetchCardList(height) {
  loadMoreBtn.disable();

  apiService.fetchCards().then(hits => {
    if (hits.length === 0) {
      noticeError();

      loadMoreBtn.hide();
      return;
    }

    noticeInfo();

    imageCardMarkup(hits);

    lasyLoadImages();

    loadMoreBtn.show();
    loadMoreBtn.enable();

    window.scrollBy({
      top: height,
      behavior: 'smooth',
    });
  });
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function noticeInfo() {
  if (apiService.query === '') {
    info({
      title: `Images for different themes found! Enjoy :)`,
      delay: 1000,

      sticker: false,
    });
  } else {
    info({
      title: `Images with '${apiService.query}' found! Enjoy :)`,
      delay: 1000,

      sticker: false,
    });
  }
}

function noticeError() {
  error({
    title: `Images with '${apiService.query}' not found!`,
    delay: 1000,

    sticker: false,
  });
}

function scrollOnTopHandler(event) {
  // console.log(event);
  if (pageYOffset > window.innerHeight) {
    refs.scrollOnTopBtn.classList.add('show');
  } else {
    refs.scrollOnTopBtn.classList.remove('show');
  }
}
