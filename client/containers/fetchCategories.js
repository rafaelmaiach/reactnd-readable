import { getAllCategories, getCategoryPosts } from 'Utils/api/categories';

const fetchAllCategories = () => {
  getAllCategories()
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

const fetchCategoryPosts = () => {
  getCategoryPosts('redux')
    .then(r => console.log(r))
    .catch(e => console.log(e));
};

export {
  fetchAllCategories,
  fetchCategoryPosts,
};
