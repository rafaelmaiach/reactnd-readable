import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Categories = ({ categories }) => {
  const { list } = categories;

  const categoriesList = list && list.map(({ name }) => (
    <Link key={name} to={`/${name}`}>{name}</Link>
  ));

  return (
    <Fragment>
      <h1>CATEGORIES</h1>
      {categoriesList}
    </Fragment>
  );
};

const mapStateToProps = ({ categories }) => ({
  categories,
});

export default connect(mapStateToProps)(Categories);
