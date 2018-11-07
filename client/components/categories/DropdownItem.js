import React from 'react';

import { capitalize } from 'Utils/helpers';

const DropdownItem = ({ category, handleField }) => (
  <a href="#" className="dropdown-item" onClick={() => handleField(category)}>
    {capitalize(category)}
  </a>
);

export default DropdownItem;
