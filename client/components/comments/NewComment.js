import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { handleAddComment } from 'Actions/comments';

import Form from 'Components/form/Form';
import FormFieldData from 'Components/form/FormFieldData';

const NewComment = (props) => {
  const {
    parentId, addComment, toggleForm,
  } = props;

  const createNewComment = (data) => {
    const { author, message } = data;

    // Create the data for a new post
    const postData = {
      id: uuid(),
      timestamp: Date.now(),
      body: message,
      author,
      parentId,
    };

    addComment(postData);
  };


  const fieldsNeeded = [FormFieldData.author, FormFieldData.message];

  const FormComponent = (
    <Form
      {...props}
      create={createNewComment}
      fieldsNeeded={fieldsNeeded}
      fieldsToReset={['author', 'message']}
    />
  );

  return (
    <div className="columns is-multiline is-centered comments__container">
      <div className="column is-12-mobile is-8 comments__header">
        <p className="title is-size-6-mobile is-size-6 comments__header--text">
          New comment
        </p>
        {FormComponent}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addComment: (comment) => {
    dispatch(handleAddComment(comment));
  },
});

export default connect(null, mapDispatchToProps)(NewComment);
