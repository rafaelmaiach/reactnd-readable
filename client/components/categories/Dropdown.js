import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { capitalize, isCategoryActive } from 'Utils/common.helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import DropdownItem from './DropdownItem';

// Create the dropdown item for new post
const createDropdownItem = (category, currentCategory, handleField) => {
  const isActive = isCategoryActive(category, currentCategory);

  return (
    <DropdownItem
      key={category}
      category={category}
      handleField={handleField}
      isActive={isActive}
    />
  );
};

// Dropdown component for categories. It shows all categories options for create a new post and allow you to select one
const Dropdown = (props) => {
  const { categories, currentCategory, handleField } = props;

  const dropdownItems = categories.map(category => createDropdownItem(category, currentCategory, handleField));

  // If a category is selected, change the dropdown text to use the selected one
  const category = capitalize(currentCategory) || 'Select a category...';

  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>{category}</span>
          <span className="icon is-small">
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {dropdownItems}
        </div>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentCategory: PropTypes.string.isRequired,
  handleField: PropTypes.func.isRequired,
};

const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories).map(({ name }) => name),
});

export default connect(mapStateToProps)(Dropdown);
