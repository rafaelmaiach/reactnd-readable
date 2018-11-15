import React from 'react';
import { connect } from 'react-redux';

import { Modal } from 'antd';

import { handleEditComment } from 'Actions/comments';
import Form from 'Components/form/Form';

/**
 * @constructor EditComment
 * @param {object} props - EditComment props
 * @description Create a HOC to handle create and update functions and render a new form for new post or editing post
 */
const EditComment = (props) => {
  const {
    addPost,
    postInfo,
    updatePost,
    cancelEdition,
    isEdition,
    isPostFormOpen,
  } = props;

  const closePostForm = cancelEdition || closeForm;

  /**
   * @function createEditComment
   * @param {object} data - Form data
   */
  const createEditComment = (data) => {
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
      createPost={createEditComment}
      updatePost={updateExistingPost}
      closeForm={closePostForm}
    />
  );

  return (
    <div className="column is-12-mobile is-8">
      <div className="card">
        <div className="card-content">
          {FormComponent}
        </div>
      </div>
    </div>

  );
};

const mapDispatchToProps = dispatch => ({
  updateComment: (comment) => {
    dispatch(handleEditComment(comment));
  },
});

export default connect(null, mapDispatchToProps)(EditComment);
