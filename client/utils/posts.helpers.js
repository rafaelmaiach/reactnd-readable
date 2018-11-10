import React from 'react';

import { Form, Input, Select } from 'antd';

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
      return field;
    case 'textarea':
      field.component = decorator(<Input.TextArea autosize={{ minRows: 3, maxRows: 7 }} className="form-input" />);
      return field;
    case 'dropdown':
      field.component = decorator(<Select className="form-dropdown">{options}</Select>);
      return field;
    default:
      return null;
  }
};

const createFieldsElements = fields => fields.map(({ label, component }) => (
  <div key={label} className="column is-10">
    <span className="title is-size-6">{label}</span>
    <Form.Item>
      {component}
    </Form.Item>
  </div>
));

const getDecorators = (getFieldDecorator) => {
  const fieldDecorator = wrapperFieldDecorator(getFieldDecorator);

  return { createField: params => createField(params, fieldDecorator) };
};

export {
  getDecorators,
  createFieldsElements,
};
