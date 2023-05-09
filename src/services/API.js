import axios from 'axios';

const API_KEY = '23234796-47fbd745329069e6b0b2bf0fd';
const per_page = 12;
axios.defaults.baseURL = `https://pixabay.com/api/?&key=${API_KEY}&per_page=${per_page}&image_type=photo&orientation=horizontal`;

const getImage = async (value, page = 1) => {
  const response = await axios.get(`&q=${value}&page=${page}`);
  return response.data;
};
const getTotalPages = image => {
  return Math.ceil(Number(image.totalHits) / per_page);
};

export { getImage, getTotalPages };
