import React from 'react';
import { connect } from 'react-redux';
import { changeCurrentCategory } from '../actions/categories';

const handleCategories = (e, dispatch) => {
  const { value } = e.target;
  const payload = {
    name: value,
    path: value,
  };

  dispatch(changeCurrentCategory(payload));
};

const Categories = ({ dispatch, categories }) => (
  <div>
    <h1>CATEGORIES</h1>
    <select name="category" id="category" onChange={e => handleCategories(e, dispatch)}>
      {
        categories && categories.list && categories.list.map(c => <option value={c.name}>{c.name}</option>)
      }
    </select>
  </div>
);

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default connect(mapStateToProps)(Categories);
