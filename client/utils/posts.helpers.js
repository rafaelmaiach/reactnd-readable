import React from 'react';

import { Form, Input, Select } from 'antd';
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

const createInput = (label, getFieldDecorator) => {
  const fieldDecorator = () => generateFieldDecorator(label, getFieldDecorator);

  return {
    label: capitalize(label),
    component: fieldDecorator()(<Input className="form-input" />),
  };
};

const createTextarea = (label, getFieldDecorator) => {
  const fieldDecorator = () => generateFieldDecorator(label, getFieldDecorator);

  return {
    label: capitalize(label),
    component: fieldDecorator()(<Input.TextArea autosize={{ minRows: 3, maxRows: 7 }} className="form-input" />),
  };
};

const createDropdown = (label, options, getFieldDecorator) => {
  const fieldDecorator = () => generateFieldDecorator(label, getFieldDecorator);

  return {
    label: capitalize(label),
    component: fieldDecorator()(<Select className="form-dropdown">{options}</Select>),
  };
};

const createFieldsElements = fields => fields.map(({ label, component }) => (
  <div key={label} className="column is-10">
    <span className="title is-size-6">{label}</span>
    <Form.Item>
      {component}
    </Form.Item>
  </div>
));

const getDecorators = getFieldDecorator => ({
  createInput: label => createInput(label, getFieldDecorator),
  createTextarea: label => createTextarea(label, getFieldDecorator),
  createDropdown: (label, options) => createDropdown(label, options, getFieldDecorator),
  // titleDecorator: () => generateFieldDecorator('title', getFieldDecorator),
  // authorDecorator: () => generateFieldDecorator('author', getFieldDecorator),
  // messageDecorator: () => generateFieldDecorator('message', getFieldDecorator),
  // categoryDecorator: () => generateFieldDecorator('category', getFieldDecorator),
});

export {
  getDecorators,
  createFieldsElements,
};
