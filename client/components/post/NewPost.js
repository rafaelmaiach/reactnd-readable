import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { Modal } from 'antd';

import { handleAddPost, handleEditPost } from 'Actions/posts';

import { categoriesValuesSelector } from 'Selectors/categories';

import Form from 'Components/form/Form';
import FormFieldData from 'Components/form/FormFieldData';

/**
 * @constructor NewPost
 * @param {object} props - NewPost props
 * @description Create a HOC to handle create and update functions and render a new form for new post or editing post
 */
const NewPost = (props) => {
  const {
    categories,
    addPost,
    info,
    updatePost,
    cancelEdition,
    isEdition,
    isPostFormOpen,
    closeForm,
    isBoxLayout,
  } = props;

  // Get the correct cancel new post / cancel edition handler
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
      id: info.id,
      details: {
        title,
        body: message,
        edited: Date.now(),
      },
    };

    updatePost(postData);
    closePostForm();
  };

  /**
   * @function getFieldsNeeded
   * @description Get the fields needed to create the form
   */
  const getFieldsNeeded = () => {
    const {
      title, message, author, category,
    } = FormFieldData;

    let fieldsData = null;

    // Edition form has less fields than new post form
    if (isEdition) {
      fieldsData = [
        title,
        message,
      ];
    } else {
      fieldsData = [
        title,
        author,
        message,
        { ...category, options: categories },
      ];
    }

    return fieldsData;
  };

  const fieldsNeeded = getFieldsNeeded();

  const FormComponent = (
    <Form
      {...props}
      create={createNewPost}
      update={updateExistingPost}
      close={closePostForm}
      fieldsNeeded={fieldsNeeded}
    />
  );

  return (
    isEdition
      ? (
        <div className={`column ${isBoxLayout ? 'is-4' : 'is-8'}`}>
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
        >
          {FormComponent}
        </Modal>
      )
  );
};

NewPost.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
  addPost: PropTypes.func.isRequired,
  info: PropTypes.shape({
    id: PropTypes.string,
  }),
  updatePost: PropTypes.func.isRequired,
  cancelEdition: PropTypes.func,
  isEdition: PropTypes.bool,
  isPostFormOpen: PropTypes.bool,
  closeForm: PropTypes.func.isRequired,
  isBoxLayout: PropTypes.bool,
};

NewPost.defaultProps = {
  info: null,
  cancelEdition: null,
  isEdition: false,
  isBoxLayout: false,
  isPostFormOpen: false,
};

const mapStateToProps = state => ({
  categories: categoriesValuesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => {
    dispatch(handleAddPost(post));
  },
  updatePost: (post) => {
    dispatch(handleEditPost(post));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
