import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

/**
 * @constructor FormField
 * @param {object} {label, component} - Label is the value to show on top of field, component is the react component to be rendered
 */
const FormField = ({ label, component }) => (
  <div key={label} className="column is-10">
    <span className="form-field-label is-size-6">{label}</span>
    <Form.Item hasFeedback={label !== 'Category'}>
      {component}
    </Form.Item>
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};

export default FormField;
