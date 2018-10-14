import React from 'react';

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

const Readable = () => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <button type="button" onClick={fetchAllCategories}>
      getAllCategories
    </button>
    <button type="button" onClick={fetchCategoryPosts}>
      getCategoryPosts
    </button>
  </div>
);

export default Readable;
