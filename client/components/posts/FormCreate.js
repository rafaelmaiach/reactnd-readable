import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form, Input, Select, Button,
} from 'antd';

import { capitalize } from 'Utils/common.helpers';
import { getDecorators } from 'Utils/posts.helpers';
import FormField from './FormField';

const { TextArea } = Input;
const { Option } = Select;

class FormCreate extends Component {
  constructor(props) {
    super(props);

    const { form: { validateFields, getFieldDecorator, setFieldsValue } } = props;

    this.getFieldDecorator = getFieldDecorator;
    this.validateFields = validateFields;
    this.setFieldsValue = setFieldsValue;
  }

  componentDidMount() {
    this.setupInitialValues();
    this.setupCategories();
  }

  setupInitialValues = () => {
    this.setFieldsValue({
      title: '',
      author: '',
      message: '',
    });
  }

  setupCategories = () => {
    const { categories } = this.props;

    this.selectOptions = categories.map(({ name, label }) => <Option key={name} value={name}>{label}</Option>);
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { createPost } = this.props;

    this.validateFields((err, data) => {
      if (!err) {
        createPost(data);
      }
    });
  }

  createFields = () => {
    const decorators = getDecorators(this.getFieldDecorator);
    const { createField } = decorators;

    const fieldsData = [
      { id: 'title', label: 'Title', type: 'input' },
      { id: 'author', label: 'Author', type: 'input' },
      { id: 'message', label: 'Message', type: 'textarea' },
      {
        id: 'category', label: 'Category', type: 'dropdown', options: this.selectOptions,
      },
    ];

    return fieldsData.map(createField);
  }

  render() {
    const fields = this.createFields();

    return (
      <Form onSubmit={this.handleSubmit} className="columns is-multiline is-centered">
        {fields}
        <div className="column is-10 form-buttons-container">
          <div className="columns">
            <div className="column">
              <Button className="button is-primary form-submit-button" type="primary" htmlType="submit">
                Create
              </Button>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories).map(({ name }) => ({ name, label: capitalize(name) })),
});

const connectedPostForm = connect(mapStateToProps)(FormCreate);
const WrappedFormCreate = Form.create({})(connectedPostForm);

export default WrappedFormCreate;
