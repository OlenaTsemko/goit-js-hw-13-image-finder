import refs from './refs';
import imagesTpl from '../templates/images.hbs';

function imageCardMarkup(imageCard) {
  const markup = imagesTpl(imageCard);

  refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
}

export default imageCardMarkup;
