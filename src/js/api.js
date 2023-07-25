import axios from 'axios';
import { pageScrolling } from './Page-scrolling';
import {
  renderGallery,
  handleQuantityOfImages,
  handleNoImages,
  handleEndOfImages,
  initLightBox,
} from './utilities';

const URL = 'https://pixabay.com/api/';
const API_KEY = '25385009-fbf12157e432b3e643b87146c';
const PER_PAGE = 40;

// Робимо запит і отримуємо відповідь від pixabay
const fetchImage = async (searchQuery, page) => {
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        imageType: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
      },
    });
    console.log(response.status);
    if (response.status === 404) {
      throw new Error('Page not found error 404');
    }

    return response;
  } catch {
    throw new Error('Error while fetching data from the API');
  }
};

// обробляємо відповідь від pixabay
export const processApiAnswer = async (
  page,
  searchQuery,
  galleryRef,
  loadMoreRef
) => {
  try {
    const response = await fetchImage(searchQuery, page);
    const arrayImages = response.data.hits;
    const totalImages = response.data.totalHits;

    if (totalImages > 0 && page === 1) {
      handleQuantityOfImages(totalImages); // виводимо к-ть знайдених картинок
    }
    if (totalImages === 0) {
      handleNoImages(loadMoreRef); // Якщо наш запит не знайшов даних що задовільняють.
      return;
    }
    if (totalImages <= PER_PAGE * page) {
      handleEndOfImages(loadMoreRef); //викликаєм коли закінчились картинки
      return;
    }
    renderGallery(galleryRef, arrayImages); // рендеримо розмітку
    pageScrolling(galleryRef); //скролимо на висоту * 2 першого елемента
    loadMoreRef.style.display = 'block';
    initLightBox(); // ініціалізуємо lightBox
  } catch {
    handleError(); // виводимо повідомлення про помилку
  }
};
