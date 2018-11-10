import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Input } from 'antd';

import { getDecorators, createFieldsElements } from 'Utils/posts.helpers';

class FormEdition extends Component {
  constructor(props) {
    super(props);
    const { form: { validateFields, getFieldDecorator, setFieldsValue } } = props;

    this.getFieldDecorator = getFieldDecorator;
    this.validateFields = validateFields;
    this.setFieldsValue = setFieldsValue;
  }

  componentDidMount() {
    this.setupInitialValues();
  }

  setupInitialValues = () => {
    const { postInfo: { title, message } } = this.props;

    this.setFieldsValue({
      title,
      message,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { updatePost } = this.props;

    this.validateFields((err, data) => {
      if (!err) {
        updatePost(data);
      }
    });
  }

  createFields = (decorators) => {
    const { createInput, createTextarea } = decorators;

    const Title = createInput('title');
    const Message = createTextarea('message');

    return createFieldsElements([Title, Message]);
  }

  render() {
    const { cancelEdition } = this.props;

    const decorators = getDecorators(this.getFieldDecorator);

    const fields = this.createFields(decorators);

    return (
      <Form onSubmit={this.handleSubmit} className="columns is-multiline is-centered">
        {fields}

        <div className="columns">
          <div className="column">
            <Button className="button is-primary form-submit-button" type="primary" htmlType="submit">
              Create
            </Button>
          </div>
          <div className="column">
            <Button className="button is-danger form-submit-button" type="primary" onClick={cancelEdition}>
              Cancel
            </Button>
          </div>
        </div>
      </Form>
    );
  }
}

const WrappedFormEdition = Form.create({})(FormEdition);

export default WrappedFormEdition;
