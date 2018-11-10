import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Button } from 'antd';

import { getCreateField } from 'Utils/form.helpers';

class PostForm extends Component {
  static propTypes = {
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
  }

  static defaultProps = {
    isEdition: false,
    postInfo: null,
    cancelEdition: null,
  }

  constructor(props) {
    super(props);

    const {
      form: { validateFields, getFieldDecorator, setFieldsValue },
      isEdition,
      postInfo,
    } = props;

    // Add form helper functions to class to easy access
    this.getFieldDecorator = getFieldDecorator;
    this.validateFields = validateFields;
    this.setFieldsValue = setFieldsValue;
    this.isEdition = isEdition;
    this.postInfo = postInfo;
  }

  componentDidMount() {
    this.setupInitialValues();
  }

  /**
   * @method PostForm#setupInitialValues
   * @description Set the initial values for form.
   */
  setupInitialValues = () => {
    const values = {
      title: '',
      message: '',
    };

    // If the Form was created by an edition post, set the initial values to post information
    if (this.isEdition) {
      const { title, message } = this.postInfo;
      values.title = title;
      values.message = message;
    } else {
      // If it's a new post, set the initial value for author, because doesn't have this for edition
      values.author = '';
    }

    this.setFieldsValue(values);
  }

  /**
   * @method PostForm#handleSubmit
   * @description Submit the form information to create or edit a post
   */
  handleSubmit = (e) => {
    e.preventDefault();

    const { createPost, updatePost } = this.props;

    // Validate the form using a built-in form validation from ant design form
    // Call update or create post dispatch based on is edition or new post only if doesn't happened any error
    this.validateFields((err, data) => {
      if (!err && this.isEdition) {
        updatePost(data);
        return;
      }

      if (!err) {
        createPost(data);
      }
    });
  }

  /**
   * @method PostForm#createFields
   * @description Create only the needed fields for the form (new or edition).
   */
  createFields = () => {
    const createField = getCreateField(this.getFieldDecorator);

    let fieldsData = null;

    // Edition form has less fields than new post form
    if (this.isEdition) {
      fieldsData = [
        { id: 'title', label: 'Title', type: 'input' },
        { id: 'message', label: 'Message', type: 'textarea' },
      ];
    } else {
      const { categories } = this.props;
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
  }

  render() {
    const { cancelEdition } = this.props;
    const fields = this.createFields();

    return (
      <Form onSubmit={this.handleSubmit} className="columns is-multiline is-centered">
        {fields}
        <div className="column is-10 form-buttons-container">
          <div className="columns">
            <div className="column">
              <Button className="button is-primary form-submit-button" type="primary" htmlType="submit">
                {this.isEdition ? 'Save' : 'Create'}
              </Button>
            </div>
            {
              this.isEdition && (
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
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories),
});

const connectedPostForm = connect(mapStateToProps)(PostForm);
const WrappedPostForm = Form.create({})(connectedPostForm);

export default WrappedPostForm;
