import { getHeaders, getApiUrl } from './helpers';

const getAllCategories = () => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);
};

export {
  getAllCategories,
};
