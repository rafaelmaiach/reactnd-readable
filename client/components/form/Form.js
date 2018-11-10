import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Button } from 'antd';

import { getCreateField } from 'Utils/form.helpers';

const PostForm = (props) => {
  const {
    form: { validateFields, getFieldDecorator },
    isEdition,
    postInfo,
    cancelEdition,
    createPost,
    updatePost,
    categories,
  } = props;

  /**
   * @method PostForm#handleSubmit
   * @description Submit the form information to create or edit a post
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form using a built-in form validation from ant design form
    // Call update or create post dispatch based on is edition or new post only if doesn't happened any error
    validateFields((err, data) => {
      if (!err && isEdition) {
        updatePost(data);
        return;
      }

      if (!err) {
        createPost(data);
      }
    });
  };

  /**
   * @method PostForm#createFields
   * @description Create only the needed fields for the form (new or edition).
   */
  const createFields = () => {
    const createField = getCreateField(getFieldDecorator, postInfo);

    let fieldsData = null;

    // Edition form has less fields than new post form
    if (isEdition) {
      fieldsData = [
        { id: 'title', label: 'Title', type: 'input' },
        { id: 'message', label: 'Message', type: 'textarea' },
      ];
    } else {
      fieldsData = [
        { id: 'title', label: 'Title', type: 'input' },
        { id: 'author', label: 'Author', type: 'input' },
        { id: 'message', label: 'Message', type: 'textarea' },
        {
          id: 'category', label: 'Category', type: 'dropdown', options: categories,
        },
      ];
    }

    return fieldsData.map(createField);
  };

  const fields = createFields();

  return (
    <Form onSubmit={handleSubmit} className="columns is-multiline is-centered">
      {fields}
      <div className="column is-10 form-buttons-container">
        <div className="columns">
          <div className="column">
            <Button className="button is-primary form-submit-button" type="primary" htmlType="submit">
              {isEdition ? 'Save' : 'Create'}
            </Button>
          </div>
          {
            isEdition && (
              <div className="column">
                <Button className="button is-danger form-submit-button" type="primary" onClick={cancelEdition}>
                    Cancel
                </Button>
              </div>)
          }
        </div>
      </div>
    </Form>
  );
};

PostForm.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  })).isRequired,
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    setFieldsValue: PropTypes.func,
  }).isRequired,
  postInfo: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
  }),
  isEdition: PropTypes.bool,
  createPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  cancelEdition: PropTypes.func,
};

PostForm.defaultProps = {
  isEdition: false,
  postInfo: null,
  cancelEdition: null,
};

const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories),
});

const connectedPostForm = connect(mapStateToProps)(PostForm);
const WrappedPostForm = Form.create({})(connectedPostForm);

export default WrappedPostForm;
