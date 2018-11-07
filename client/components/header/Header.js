import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { receiveAllCategories } from 'Actions/categories';

class Header extends Component {
  state = {
    menuOpen: false,
    currentTab: '',
  }

  componentDidMount() {
    const { getAllCategories, match } = this.props;

    if (match.params.category) {
      this.setState(() => ({ currentTab: match.params.category }));
    }

    getAllCategories();
  }

  toggleMenu = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  changeCurrentTab = tabName => () => this.setState(() => ({ currentTab: tabName }))

  render() {
    const { menuOpen, currentTab } = this.state;
    const { categories } = this.props;
    const { list } = categories;

    const isMenuOpen = menuOpen ? 'is-active' : '';

    const categoriesList = list && list.map(({ name }) => {
      const isTabActive = currentTab === name ? 'is-active' : '';
      const changeTab = this.changeCurrentTab(name);
      return (
        <Link
          key={name}
          className={`navbar-item ${isTabActive}`}
          to={`/${name}`}
          onClick={changeTab}
        >
          {name}
        </Link>
      );
    });

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
  categories,
});

const mapDispatchToProps = dispatch => ({
  getAllCategories: () => {
    dispatch(receiveAllCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
