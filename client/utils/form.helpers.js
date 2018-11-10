import React from 'react';
import { Input, Select } from 'antd';

import FormField from 'Components/form/FormField';
import { capitalize } from './common.helpers';

const getFieldRules = () => ({
  common: {
    required: true,
    message: 'Required',
  },
  extra: {
    transform: value => value.trim(),
  },
});

const createRules = (fieldId) => {
  const { common, extra } = getFieldRules();
  const rules = fieldId === 'category' ? common : { ...common, ...extra };

  return rules;
};

const generateFieldDecorator = (fieldId, getFieldDecorator) => {
  const rules = createRules(fieldId);
  const options = { rules: [rules] };

  return getFieldDecorator(fieldId, options);
};

const wrapperFieldDecorator = getFieldDecorator => label => generateFieldDecorator(label, getFieldDecorator);

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

const getDecorators = (getFieldDecorator) => {
  const fieldDecorator = wrapperFieldDecorator(getFieldDecorator);

  return { createField: params => createField(params, fieldDecorator) };
};

export { getDecorators };
