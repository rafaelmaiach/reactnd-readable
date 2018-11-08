import React from 'react';
import PropTypes from 'prop-types';

import { capitalize } from 'Utils/helpers';

const DropdownItem = ({ category, handleField, isActive }) => (
  <a href="#" className={`dropdown-item ${isActive}`} onClick={() => handleField(category)}>
    {capitalize(category)}
  </a>
);

DropdownItem.propTypes = {
  category: PropTypes.string.isRequired,
  isActive: PropTypes.string.isRequired,
  handleField: PropTypes.func.isRequired,
};

export default DropdownItem;
