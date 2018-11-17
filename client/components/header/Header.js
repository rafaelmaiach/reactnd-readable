import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { isCategoryActive } from 'Utils/common.helpers';

import { receiveAllCategories } from 'Actions/categories';

import { categoriesNameSelector } from 'Selectors/categories';

import HeaderBrand from './HeaderBrand';

/**
 * @class Header
 * @description Header component to list all categories and allow navigation between them
 */
class Header extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      path: PropTypes.string,
    })).isRequired,
    getAllCategories: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  }

  state = {
    menuOpen: false,
  }

  componentDidMount() {
    this.setupCategories();
  }

  shouldComponentUpdate(nextProps) {
    const { location: { pathname }, categories } = this.props;
    const urlChanged = pathname !== nextProps.location.pathname;
    const categoriesChanged = categories.length !== nextProps.categories.length;

    return urlChanged || categoriesChanged;
  }

  /**
   * @method Header#setupCategories
   * @description Get all application's categories and set the current tab if a category is selected
   */
  setupCategories = () => {
    const {
      getAllCategories,
    } = this.props;

    getAllCategories();
  }

  /**
   * @method Header#toggleMenu
   * @description Open and close menu on mobile
   */
  toggleMenu = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  /**
   * @method Header#createTab
   * @param {string} category - category name to be created
   * @description Create the tab component
   */
  createTab = (category) => {
    const { location: { pathname } } = this.props;

    let isTabActive = '';

    // Check the current tab based on url to set active class
    if (pathname !== '/') {
      const path = pathname.split('/')[1];
      isTabActive = isCategoryActive(path, category.path);
    }

    return (
      <Link
        key={category.path}
        className={`navbar-item ${isTabActive}`}
        to={`/${category.path}`}
      >
        {category.name}
      </Link>
    );
  }

  render() {
    const { menuOpen } = this.state;
    const { categories } = this.props;

    const isMenuOpen = menuOpen && 'is-active';

    const categoriesList = categories.map(this.createTab);

    return (
      <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
        <HeaderBrand isMenuOpen={isMenuOpen} toggleMenu={this.toggleMenu} />
        <div id="navbarCategories" className={`navbar-menu ${isMenuOpen}`}>
          <div className="navbar-start">
            {categoriesList}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  categories: categoriesNameSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getAllCategories: () => {
    dispatch(receiveAllCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
