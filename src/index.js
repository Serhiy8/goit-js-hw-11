import { fetchImage, PER_PAGE } from './js/api';
import { pageScrolling } from './js/Page-scrolling';
import {
  renderGallery,
  handleQuantityOfImages,
  handleNoImages,
  handleEndOfImages,
  handleLessThanOnePage,
  initLightBox,
  handleError,
} from './js/utilities.js';

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('form');
const loadMoreRef = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

// обробляємо відповідь від pixabay
const processApiAnswer = async (page, searchQuery, galleryRef, loadMoreRef) => {
  try {
    const response = await fetchImage(searchQuery, page);
    const arrayImages = response.data.hits;
    const totalImages = response.data.totalHits;

    renderGallery(galleryRef, arrayImages); // рендеримо розмітку
    pageScrolling(galleryRef); //скролимо на висоту * 2 першого елемента

    if (totalImages > 0 && page === 1) {
      handleQuantityOfImages(totalImages); // виводимо к-ть знайдених картинок
    }

    if (totalImages === 0) {
      handleNoImages(loadMoreRef); // Якщо наш запит не знайшов даних що задовільняють.
      return;
    }
    if (totalImages <= PER_PAGE * page && page > 1) {
      handleEndOfImages(loadMoreRef); //викликаєм коли закінчились картинки
      return;
    }

    if (totalImages <= PER_PAGE && page === 1) {
      handleLessThanOnePage(); //це все що ми знайшли
      return;
    }

    loadMoreRef.style.display = 'block';
    initLightBox(); // ініціалізуємо lightBox
  } catch {
    handleError(); // виводимо повідомлення про помилку
  }
};

const handleSubmitForm = evt => {
  evt.preventDefault();
  galleryRef.innerHTML = '';
  page = 1;
  loadMoreRef.style.display = 'none';
  searchQuery = evt.target.elements.searchQuery.value.trim();

  // перевіряємо чи користувач ввів якийсь запит
  if (!searchQuery) {
    return;
  }

  processApiAnswer(page, searchQuery, galleryRef, loadMoreRef);
};

const handleLoadMoreImages = () => {
  page += 1;
  processApiAnswer(page, searchQuery, galleryRef, loadMoreRef);
};

// Додаємо обробник події на форму
formRef.addEventListener('submit', handleSubmitForm);

// Додаємо обробник події на btn load more
loadMoreRef.addEventListener('click', handleLoadMoreImages);
