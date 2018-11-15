import React from 'react';
import { connect } from 'react-redux';

import { handleEditComment } from 'Actions/comments';
import Form from 'Components/form/Form';
import FormFieldData from 'Components/form/FormFieldData';

/**
 * @constructor EditComment
 * @param {object} props - EditComment props
 * @description Create a HOC to handle create and update functions and render a new form for new post or editing post
 */
const EditComment = (props) => {
  const {
    info,
    updateComment,
    cancelEdition,
  } = props;

  /**
   * @function updateExistingComment
   * @param {object} data - Form data
   */
  const updateExistingComment = (data) => {
    const { message } = data;

    // Create the data for update a post
    const postData = {
      id: info.id,
      details: {
        body: message,
      },
    };

    updateComment(postData);
    cancelEdition();
  };

  const fieldsNeeded = [FormFieldData.message];

  const FormComponent = (
    <Form
      {...props}
      update={updateExistingComment}
      close={cancelEdition}
      fieldsNeeded={fieldsNeeded}
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
