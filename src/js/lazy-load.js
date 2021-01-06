import refs from './refs';

function lasyLoadImages() {
  const images = refs.galleryContainer.querySelectorAll('img');

  const lazyLoad = targets => {
    const options = {
      rootMargin: '200px',
    };

    const onEntry = (entries, observer) => {
      // console.log('next images');

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          const src = image.dataset.lazy;

          image.src = src;

          observer.unobserve(image);
        }
      });
    };

    const io = new IntersectionObserver(onEntry, options);

    targets.forEach(target => io.observe(target));
  };

  lazyLoad(images);
}

export default lasyLoadImages;
