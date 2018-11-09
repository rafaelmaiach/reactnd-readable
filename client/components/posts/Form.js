import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import {
  Form, Input, Select, Button,
} from 'antd';

import { capitalize } from 'Utils/helpers';

import { handleAddPost, handleEditPost } from 'Actions/posts';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

class PostForm extends Component {
  componentDidMount() {
    const { form: { setFieldsValue } } = this.props;
    setFieldsValue({
      title: '',
      author: '',
      message: '',
    });
  }

  fieldsRules = {
    common: {
      required: true,
      message: 'Required',
    },
    extra: {
      transform: value => value.trim(),
    },
  }

  decorators = {
    titleDecorator: () => this.generateFieldDecorator('title', 'Title'),
    authorDecorator: () => this.generateFieldDecorator('author', 'Author'),
    messageDecorator: () => this.generateFieldDecorator('message', 'Message'),
    categoryDecorator: () => this.generateFieldDecorator('category', 'Category'),
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { form: { validateFields } } = this.props;

    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  createRules = (label) => {
    const { common, extra } = this.fieldsRules;
    const rules = label === 'Category' ? common : { ...common, ...extra };
    return rules;
  }

  generateFieldDecorator = (fieldId, label) => {
    const { form: { getFieldDecorator } } = this.props;

    const rules = this.createRules(label);

    const options = { rules: [rules] };

    return getFieldDecorator(fieldId, options);
  }

  createPost = (data) => {
    const {
      title, author, message, category,
    } = data;

    const { addPost, toggleNewPost } = this.props;

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
    toggleNewPost();
  }

  render() {
    const { categories } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const {
      titleDecorator, authorDecorator, messageDecorator, categoryDecorator,
    } = this.decorators;

    const selectOptions = categories.map(({ name, label }) => <Option key={name} value={name}>{label}</Option>);

    return (
      <Form onSubmit={this.handleSubmit} className="columns is-multiline">
        <div className="column is-12">
          <Item {...formItemLayout}>
            <span className="subtitle is-size-6">Title</span>
            {titleDecorator()(
              <Input className="form-input" />
            )}
          </Item>
        </div>
        <div className="column is-12">
          <Item {...formItemLayout}>
            <span className="subtitle is-size-6">Author</span>
            {authorDecorator()(
              <Input className="form-input" />
            )}
          </Item>
        </div>

        <div className="column is-12">
          <Item {...formItemLayout}>
            <span className="subtitle is-size-6">Message</span>
            {messageDecorator()(
              <TextArea autosize={{ minRows: 3, maxRows: 7 }} className="form-input" />
            )}
          </Item>
        </div>

        <div className="column is-12">
          <Item {...formItemLayout}>
            <span className="subtitle is-size-6">Category</span>
            {categoryDecorator()(
              <Select className="form-dropdown">
                {selectOptions}
              </Select>
            )}
          </Item>
        </div>

        <div className="column is-12">
          <Item wrapperCol={{ span: 12, offset: 6 }}>
            <Button className="button is-primary form-submit-button" type="primary" htmlType="submit">
              Create post
            </Button>
          </Item>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories).map(({ name }) => ({ name, label: capitalize(name) })),
});

const mapDispatchToProps = dispatch => ({
  addPost: (post) => {
    dispatch(handleAddPost(post));
  },
  updatePost: (post) => {
    dispatch(handleEditPost(post));
  },
});

const connectedPostForm = connect(mapStateToProps, mapDispatchToProps)(PostForm);
const WrappedPostForm = Form.create({})(connectedPostForm);

export default WrappedPostForm;
