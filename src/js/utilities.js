import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { createCards } from './createCards';

// рендеримо розмітку
const renderGallery = (galleryRef, arrayImages) =>
  galleryRef.insertAdjacentHTML('beforeend', createCards(arrayImages));

// виводимо к-ть знайдених картинок
const handleQuantityOfImages = totalImages =>
  Notiflix.Notify.success(`"Hooray! We found ${totalImages} images."`);

// Якщо наш запит не знайшов даних що задовільняють.
const handleNoImages = loadMoreRef => {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  loadMoreRef.style.display = 'none';
};

//викликаєм коли закінчились картинки
const handleEndOfImages = loadMoreRef => {
  loadMoreRef.style.display = 'none';
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
};

// виводимо повідомлення про помилку
const handleError = () =>
  Notiflix.Notify.failure('An error occurred while executing the request!');

// виводимо повідомлення якщо знайшли картинок менше ніж на ст орінку
const handleLessThanOnePage = () =>
  Notiflix.Notify.failure('These are all the pictures we found');

// ініціалізуємо lightBox
const initLightBox = () => {
  const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
};

export {
  renderGallery,
  handleQuantityOfImages,
  handleNoImages,
  handleEndOfImages,
  handleLessThanOnePage,
  handleError,
  initLightBox,
};
