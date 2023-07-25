import { processApiAnswer } from './js/api';

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('form');
const loadMoreRef = document.querySelector('.load-more');

let page = 1;
let searchQuery = '';

const handleSubmitForm = evt => {
  evt.preventDefault();
  galleryRef.innerHTML = '';
  page = 1;
  loadMoreRef.style.display = 'none';
  searchQuery = evt.target.elements.searchQuery.value;
  processApiAnswer(page, searchQuery, galleryRef, loadMoreRef);
};

const handleLoadMoreImages = () => {
  page += 1;
  processApiAnswer(page, searchQuery, galleryRef, loadMoreRef);
};

// Додаємо обробник події на форму
formRef.addEventListener('submit', handleSubmitForm);

// Додаємо обробник події на кнопку load more
loadMoreRef.addEventListener('click', handleLoadMoreImages);
