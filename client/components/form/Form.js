import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Form, Button } from 'antd';

import { getDecorators } from 'Utils/form.helpers';

class PostForm extends Component {
  constructor(props) {
    super(props);

    const { form: { validateFields, getFieldDecorator, setFieldsValue }, isEdition } = props;

    this.getFieldDecorator = getFieldDecorator;
    this.validateFields = validateFields;
    this.setFieldsValue = setFieldsValue;
    this.isEdition = isEdition;
  }

  componentDidMount() {
    this.setupInitialValues();
  }

  setupInitialValues = () => {
    const values = {
      title: '',
      message: '',
    };

    if (this.isEdition) {
      const { postInfo: { title, message } } = this.props;
      values.title = title;
      values.message = message;
    } else {
      values.author = '';
    }

    this.setFieldsValue(values);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { createPost, updatePost } = this.props;

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

  createFields = () => {
    const decorators = getDecorators(this.getFieldDecorator);
    const { createField } = decorators;

    let fieldsData = null;

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
