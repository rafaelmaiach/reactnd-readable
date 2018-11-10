import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { handleAddPost, handleEditPost } from 'Actions/posts';
import Form from 'Components/form/Form';

/**
 * @constructor NewPost
 * @param {object} props - NewPost props
 * @description Create a HOC to handle create and update functions and render a new form for new post or editing post
 */
const NewPost = (props) => {
  const {
    addPost,
    toggleNewPost,
    postInfo,
    updatePost,
    cancelEdition,
    isEdition,
  } = props;

  const closeForm = cancelEdition || toggleNewPost;

  /**
   * @function createNewPost
   * @param {object} data - Form data
   */
  const createNewPost = (data) => {
    const {
      title, author, message, category,
    } = data;

    // Create the data for a new post
    const postData = {
      id: uuid(),
      timestamp: Date.now(),
      title,
      body: message,
      author,
      category,
    };

    addPost(postData);
    closeForm();
  };

  /**
   * @function updateExistingPost
   * @param {object} data - Form data
   */
  const updateExistingPost = (data) => {
    const { title, message } = data;

    // Create the data for update a post
    const postData = {
      id: postInfo.id,
      details: {
        title,
        body: message,
      },
    };

    updatePost(postData);
    closeForm();
  };

  return (
    <div className={`column ${isEdition && 'is-6'}`}>
      <div className="card">
        <div className="card-content">
          <Form
            {...props}
            createPost={createNewPost}
            updatePost={updateExistingPost}
            closeForm={closeForm}
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addPost: (post) => {
    dispatch(handleAddPost(post));
  },
  updatePost: (post) => {
    dispatch(handleEditPost(post));
  },
});

export default connect(null, mapDispatchToProps)(NewPost);
