import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @constructor PostHeaderTitle
 * @param {string} id - Post id
 * @param {string} title - Post title
 * @param {string} category - Post category
 * @description Renders the Post header title
 */
const PostHeaderTitle = ({ id, title, category }) => (
  <Link to={`/${category}/${id}`}>
    <p className="is-size-5-mobile is-size-4 has-text-link post-title">
      {title}
    </p>
  </Link>
);

PostHeaderTitle.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

const areEqual = (prev, next) => prev.title === next.title;

export default memo(PostHeaderTitle, areEqual);
