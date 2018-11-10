import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Button } from 'antd';

import { getDecorators } from 'Utils/posts.helpers';

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

  createFields = () => {
    const decorators = getDecorators(this.getFieldDecorator);
    const { createField } = decorators;

    const fieldsData = [
      { id: 'title', label: 'Title', type: 'input' },
      { id: 'message', label: 'Message', type: 'textarea' },
    ];

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
                Save
              </Button>
            </div>
            <div className="column">
              <Button className="button is-danger form-submit-button" type="primary" onClick={cancelEdition}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Form>
    );
  }
}

const WrappedFormEdition = Form.create({})(FormEdition);

export default WrappedFormEdition;
