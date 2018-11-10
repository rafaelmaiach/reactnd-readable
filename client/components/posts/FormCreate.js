import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Form, Input, Select, Button,
} from 'antd';

import { capitalize } from 'Utils/common.helpers';
import { getDecorators, createFieldsElements } from 'Utils/posts.helpers';

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

  createFields = (decorators) => {
    const { createInput, createTextarea, createDropdown } = decorators;

    const Title = createInput('title');
    const Author = createInput('author');
    const Message = createTextarea('message');
    const Category = createDropdown('category', this.selectOptions);

    return createFieldsElements([Title, Author, Message, Category]);
  }

  render() {
    const decorators = getDecorators(this.getFieldDecorator);

    const fields = this.createFields(decorators);

    return (
      <Form onSubmit={this.handleSubmit} className="columns is-multiline is-centered">
        {fields}
        <div className="column is-10 has-text-centered">
          <Button className="button is-primary form-submit-button" type="primary" htmlType="submit">
            Create
          </Button>
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
