const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.js-gallery');

const btnLoadMore = document.querySelector('.js-btn-load-more');
const spinnerLoadMore = btnLoadMore.querySelector('.js-spinner-load-more');
const labelLoadMore = btnLoadMore.querySelector('.js-label-load-more');

const scrollOnTopBtn = document.querySelector('#toTop');

export default {
  searchForm,
  galleryContainer,
  btnLoadMore,
  spinnerLoadMore,
  labelLoadMore,
  scrollOnTopBtn,
};
