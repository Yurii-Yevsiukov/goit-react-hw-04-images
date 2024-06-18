import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43655713-298c2d5fc75c194159c8fe276';

const fetchImages = async ({ query, page, perPage = 12 }) => {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
export default fetchImages;
