import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { capitalize, timestampToDate } from 'Utils/common.helpers';

/**
 * @constructor PostHeaderSubtitle
 * @param {object} props - Subtitle props
 * @description Renders the Post header subtitle
 */
const PostHeaderSubtitle = (props) => {
  const {
    author, timestamp, category, edited,
  } = props;

  const date = timestampToDate(timestamp);
  const editedDate = edited ? timestampToDate(edited) : null;

  return (
    <p className="subtitle is-size-7 post-subtitle">
      <span>Posted by: </span>
      <b>{author}</b>
      <span>{` at ${date}`}</span>
      <span> on </span>
      <Link to={`/${category}`}>
        <span className="is-link post-category">{capitalize(category)}</span>
      </Link>
      {editedDate && <i>{` - edited at ${editedDate}`}</i>}
    </p>
  );
};

PostHeaderSubtitle.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  edited: PropTypes.number,
};

PostHeaderSubtitle.defaultProps = {
  edited: null,
};

const areEqual = (prev, next) => {
  const authorEqual = prev.author === next.author;
  const editedEqual = prev.edited === next.edited;

  return authorEqual && editedEqual;
};

export default memo(PostHeaderSubtitle, areEqual);
