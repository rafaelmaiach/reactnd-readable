import React from 'react';
import { Input, Select } from 'antd';

import FormField from 'Components/form/FormField';
import { capitalize } from './common.helpers';

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

const generateFieldDecorator = (fieldId, getFieldDecorator, postInfo) => {
  const rules = createRules();
  const options = { rules: [rules] };

  if (postInfo) {
    options.initialValue = postInfo[fieldId];
  }

  return getFieldDecorator(fieldId, options);
};

const wrapperFieldDecorator = (getFieldDecorator, postInfo) =>
  label => generateFieldDecorator(label, getFieldDecorator, postInfo);

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
      field.component = decorator(<Input.TextArea autosize={{ minRows: 3, maxRows: 7 }} className="form-input" />);
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

const getCreateField = (getFieldDecorator, postInfo = null) => {
  const fieldDecorator = wrapperFieldDecorator(getFieldDecorator, postInfo);

  return params => createField(params, fieldDecorator);
};

export { getCreateField };
