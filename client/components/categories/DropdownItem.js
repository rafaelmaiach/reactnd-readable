import React from 'react';

import { capitalize } from 'Utils/helpers';

const DropdownItem = ({ category, handleField, currentCategory }) => {
  const isActive = category === currentCategory ? 'is-active' : '';
  return (
    <a href="#" className={`dropdown-item ${isActive}`} onClick={() => handleField(category)}>
      {capitalize(category)}
    </a>
  );
};

export default DropdownItem;
