import React from 'react';
import { Input, Select } from 'antd';

import FormField from 'Components/form/FormField';
import { capitalize } from './common.helpers';

// Get the field rules for decorator
const getFieldRules = () => ({
  common: {
    required: true,
    message: 'Required',
    whitespace: true,
  },
});

const createRules = () => {
  const { common } = getFieldRules();

  return common;
};

// Generate the form field decorator based on the id and postInfo initial value for edited fields
const generateFieldDecorator = (fieldId, getFieldDecorator, postInfo) => {
  const rules = createRules();
  const options = { rules: [rules] };

  if (postInfo) {
    options.initialValue = postInfo[fieldId];
  }

  return getFieldDecorator(fieldId, options);
};

// Wrapper the form field on the ant design form decorator
const wrapperFieldDecorator = (getFieldDecorator, postInfo) =>
  label => generateFieldDecorator(label, getFieldDecorator, postInfo);

// Get the fields params and return the needed form field wrapped in the decorator
const createField = (params, fieldDecorator) => {
  const {
    id, label, type, options = null,
  } = params;

  const field = { label, component: null };

  const decorator = fieldDecorator(id);

  switch (type) {
    case 'input':
      field.component = decorator(<Input className="form-input" />);
      break;
    case 'textarea':
      field.component = decorator(<Input.TextArea autosize={{ minRows: 2, maxRows: 5 }} className="form-input" />);
      break;
    case 'dropdown':
      const dropdownOptions = options.map(({ name }) => ( // eslint-disable-line
        <Select.Option key={name} value={name}>{capitalize(name)}</Select.Option>
      ));

      field.component = decorator(<Select className="form-dropdown">{dropdownOptions}</Select>);
      break;
    default:
      break;
  }

  return <FormField key={id} {...field} />;
};

// Create the form field with validator already built-in from Ant design form
const getCreateField = (getFieldDecorator, postInfo = null) => {
  const fieldDecorator = wrapperFieldDecorator(getFieldDecorator, postInfo);

  return params => createField(params, fieldDecorator);
};

export { getCreateField };
