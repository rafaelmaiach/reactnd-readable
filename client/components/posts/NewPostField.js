import React from 'react';

import CategoriesDropdown from 'Components/categories/Dropdown';

const NewPostField = (props) => {
  const {
    domId,
    domType,
    label,
    handleField,
    category,
    title,
    message,
  } = props;

  let domField = null;

  switch (domType) {
    case 'input':
      domField = (
        <input
          id={domId}
          className="input"
          type="text"
          defaultValue={title}
          onChange={e => handleField(e.target.value)}
        />
      );
      break;
    case 'textarea':
      domField = (
        <textarea
          id={domId}
          className="textarea"
          maxLength={250}
          placeholder="Post message (max. 250 characters)"
          defaultValue={message}
          onChange={e => handleField(e.target.value)}
        />
      );
      break;
    case 'dropdown':
      domField = <CategoriesDropdown handleField={handleField} currentCategory={category} />;
      break;
    default:
      break;
  }

  return (
    <div className="field is-horizontal">
      <div className="field-label">
        <label htmlFor={domId} className="label">{label}</label>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            {domField}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPostField;
