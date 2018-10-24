import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Categories extends Component {
  state = {
    menuOpen: false,
  }

  toggleMenu = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
  }

  render() {
    const { menuOpen } = this.state;
    const { categories } = this.props;
    const { list } = categories;

    const isMenuOpen = menuOpen ? 'is-active' : '';

    const categoriesList = list && list.map(({ name }) => (
      <Link
        key={name}
        className="navbar-item"
        to={`/${name}`}
      >
        {name}
      </Link>
    ));

    return (
      <nav className="navbar is-fixed-top is-link" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item">CATEGORIES</span>
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

export default connect(mapStateToProps)(Categories);
