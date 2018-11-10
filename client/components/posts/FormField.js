import React from 'react';
import { Form } from 'antd';

const FormField = ({ label, component }) => (
  <div key={label} className="column is-10">
    <span className="title is-size-6">{label}</span>
    <Form.Item>
      {component}
    </Form.Item>
  </div>
);

export default FormField;
