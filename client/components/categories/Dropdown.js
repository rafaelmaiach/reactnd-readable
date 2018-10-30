import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import DropdownItem from './DropdownItem';

const Dropdown = ({ categories }) => {
  const dropdownItems = categories.map(category => <DropdownItem key={category} category={category} />);

  return (
    <div className="dropdown is-hoverable">
      <div className="dropdown-trigger">
        <button type="button" className="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Select...</span>
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

const mapStateToProps = ({ categories }) => ({
  categories: categories.list.map(({ name }) => name),
});

export default connect(mapStateToProps)(Dropdown);
