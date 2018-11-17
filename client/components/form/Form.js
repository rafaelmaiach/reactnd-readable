import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'antd';

import { getCreateField } from 'Utils/form.helpers';

/**
 * @constructor Formulary
 * @param {object} props - Formulary properties
 * @description Form component for posts
 */
const Formulary = (props) => {
  const {
    form: { validateFields, getFieldDecorator, resetFields },
    isEdition,
    info,
    close,
    create,
    update,
    fieldsNeeded,
    fieldsToReset,
    isComment,
  } = props;

  const resetForm = () => resetFields(fieldsToReset);

  const closeForm = close || resetForm;

  /**
   * @function handleSubmit
   * @description Submit the form information to create or edit a post
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form using a built-in form validation from ant design form
    // Call update or create post dispatch based on is edition or new post only if doesn't happened any error
    validateFields((err, data) => {
      if (!err && isEdition) {
        update(data);
        return;
      }

      if (!err) {
        create(data);

        if (fieldsToReset) {
          resetForm();
        }
      }
    });
  };

  /**
   * @function createFields
   * @description Create only the needed fields for the form (new or edition).
   */
  const createFields = () => {
    const createField = getCreateField(getFieldDecorator, info);

    return fieldsNeeded.map(createField);
  };

  const fields = createFields();

  let buttonText = '';

  if (isComment) {
    buttonText = isEdition ? 'Save' : 'Comment';
  } else {
    buttonText = isEdition ? 'Save' : 'Create';
  }

  return (
    <Form onSubmit={handleSubmit} className="columns is-multiline is-centered" autoComplete="off">
      {fields}
      <div className="column is-10 form-buttons-container">
        <button className="button form-cancel-button" type="button" onClick={closeForm}>
          Cancel
        </button>
        <button className="button is-link" type="submit">
          {buttonText}
        </button>
      </div>
    </Form>
  );
};

Formulary.propTypes = {
  form: PropTypes.shape({
    validateFields: PropTypes.func,
    getFieldDecorator: PropTypes.func,
    setFieldsValue: PropTypes.func,
  }).isRequired,
  info: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string,
  }),
  isEdition: PropTypes.bool,
  create: PropTypes.func,
  update: PropTypes.func,
  close: PropTypes.func,
  fieldsNeeded: PropTypes.arrayOf(PropTypes.object).isRequired,
  fieldsToReset: PropTypes.arrayOf(PropTypes.string),
};

Formulary.defaultProps = {
  create: null,
  update: null,
  close: null,
  isEdition: false,
  info: null,
  fieldsToReset: null,
};

const WrappedFormulary = Form.create({})(Formulary);

export default WrappedFormulary;
