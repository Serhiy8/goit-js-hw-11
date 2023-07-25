import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '25385009-fbf12157e432b3e643b87146c';
export const PER_PAGE = 40;

// Робимо запит і отримуємо відповідь від pixabay
export const fetchImage = async (searchQuery, page) => {
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
    if (response.status === 404) {
      throw new Error('Page not found error 404');
    }

    return response;
  } catch {
    throw new Error('an error occurred while fetching the images from the API');
  }
};
