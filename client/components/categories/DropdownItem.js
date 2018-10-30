import React from 'react';

import { capitalize } from 'Utils/helpers';

const DropdownItem = ({ category }) => (
  <a href="#" className="dropdown-item">
    {capitalize(category)}
  </a>
);

export default DropdownItem;
