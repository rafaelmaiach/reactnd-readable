import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

/**
 * @constructor FormField
 * @param {object} {label, component} - Label is the value to show on top of field, component is the react component to be rendered
 */
const FormField = ({ label, component }) => (
  <div key={label} className="column is-10">
    <span className="title is-size-6">{label}</span>
    <Form.Item hasFeedback={label !== 'Category'}>
      {component}
    </Form.Item>
  </div>
);

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  component: PropTypes.node.isRequired,
};

// Define an areEqual function to the new React.memo to improve performance on Ant Design form field that was rendering
// all the fields when one change.
// With areEqual function, only the edited field will be re-rendered
const areEqual = (prevProps, nextProps) => prevProps.component.props.value === nextProps.component.props.value;

export default memo(FormField, areEqual);
