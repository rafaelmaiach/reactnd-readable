import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { isCategoryActive } from 'Utils/common.helpers';

import { receiveAllCategories } from 'Actions/categories';

class Header extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    getAllCategories: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    menuOpen: false,
    currentTab: '',
  }

  componentDidMount() {
    this.setupCategories();
  }

  setupCategories = () => {
    const {
      getAllCategories,
      match: { params: { category } },
    } = this.props;

    if (category) {
      this.setState(() => ({ currentTab: category }));
    }

    getAllCategories();
  }

  toggleMenu = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  changeCurrentTab = tabName => () => this.setState(() => ({ currentTab: tabName }));

  createTab = (category) => {
    const { currentTab } = this.state;

    const isTabActive = isCategoryActive(category, currentTab);
    const changeTab = this.changeCurrentTab(category);

    return (
      <Link
        key={category}
        className={`navbar-item ${isTabActive}`}
        to={`/${category}`}
        onClick={changeTab}
      >
        {category}
      </Link>
    );
  }

  render() {
    const { menuOpen } = this.state;
    const { categories } = this.props;

    const isMenuOpen = menuOpen && 'is-active';

    const categoriesList = categories.map(this.createTab);

    return (
      <nav className="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/" onClick={this.changeCurrentTab('')}> READABLE </Link>

          <span
            role="button"
            className={`navbar-burger burger ${isMenuOpen}`}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarCategories"
            onClick={this.toggleMenu}
            tabIndex={0}
            onKeyDown={() => ({})}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </span>
        </div>

        <div id="navbarCategories" className={`navbar-menu is-info ${isMenuOpen}`}>
          <div className="navbar-start">
            {categoriesList}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories).map(({ name }) => name),
});

const mapDispatchToProps = dispatch => ({
  getAllCategories: () => {
    dispatch(receiveAllCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
