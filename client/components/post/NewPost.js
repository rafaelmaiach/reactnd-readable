import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { Modal } from 'antd';

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
    postInfo,
    updatePost,
    cancelEdition,
    isEdition,
    isPostFormOpen,
    closeForm,
  } = props;

  const closePostForm = cancelEdition || closeForm;

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
    closePostForm();
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
    closePostForm();
  };

  const FormComponent = (
    <Form
      {...props}
      createPost={createNewPost}
      updatePost={updateExistingPost}
      closeForm={closePostForm}
    />
  );

  return (
    isEdition
      ? (
        <div className="column is-7">
          <div className="card">
            <div className="card-content">
              {FormComponent}
            </div>
          </div>
        </div>
      )
      : (
        <Modal
          title="NEW POST"
          visible={isPostFormOpen}
          footer={null}
          closable={false}
          onCancel={closePostForm}
          destroyOnClose
          bodyStyle={{ backgroundColor: '#f1f2f3' }}
        >
          {FormComponent}
        </Modal>
      )
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
