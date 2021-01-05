import refs from '../refs';

const loadMoreBtn = {
  enable() {
    refs.btnLoadMore.disabled = false;
    refs.labelLoadMore.textContent = 'Load more';
    refs.spinnerLoadMore.classList.add('is-hidden');
  },

  disable() {
    refs.btnLoadMore.disabled = true;
    refs.labelLoadMore.textContent = 'Loading...';
    refs.spinnerLoadMore.classList.remove('is-hidden');
  },

  show() {
    refs.btnLoadMore.classList.remove('is-hidden');
  },

  hide() {
    refs.btnLoadMore.classList.add('is-hidden');
  },
};

export default loadMoreBtn;
