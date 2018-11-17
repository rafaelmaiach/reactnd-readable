import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';

/**
 * @constructor HeaderBrand
 * @param {boolean} isMenuOpen - check if the menu is open on mobile
 * @param {function} toggleMenu - toggle the menu from open and close
 * @description Create the brand on header
 */
const HeaderBrand = ({ isMenuOpen, toggleMenu }) => (
  <div className="navbar-brand">
    <Link className="navbar-item" to="/">
      <FontAwesomeIcon icon={faDesktop} size="2x" />
      OMAIA
    </Link>

    <span
      role="button"
      className={`navbar-burger burger ${isMenuOpen}`}
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarCategories"
      onClick={toggleMenu}
      tabIndex={0}
      onKeyDown={() => ({})}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </span>
  </div>
);

HeaderBrand.propTypes = {
  isMenuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

const areEqual = (prev, next) => prev.isMenuOpen === next.isMenuOpen;

export default memo(HeaderBrand, areEqual);
