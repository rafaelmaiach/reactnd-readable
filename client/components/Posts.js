import React from 'react';
import { connect } from 'react-redux';

const Posts = ({ posts }) => (
  <div>
    <h1>POSTS</h1>
    <p>{JSON.stringify(posts)}</p>
  </div>
);

const getPostsForCategory = (categories, posts) => {
  const { current } = categories;
  const postsFiltered = Object.values(posts).filter(p => p.category === current.name);
  return postsFiltered;
};

const mapStateToProps = ({ categories, posts }) => ({
  posts: getPostsForCategory(categories, posts),
});

export default connect(mapStateToProps)(Posts);
