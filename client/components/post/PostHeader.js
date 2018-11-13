import React from 'react';
import { Link } from 'react-router-dom';

import { capitalize } from 'Utils/common.helpers';

import Options from './options/Options';

const PostHeader = (props) => {
  const {
    id, author, title, category, timestamp,
  } = props;

  const date = new Date(timestamp).toLocaleDateString();

  return (
    <header className="card-header">
      <div className="post-header">
        <Link to={`/${category}/${id}`}>
          <p className="is-size-5-mobile is-size-4 has-text-link post-title">
            {title}
          </p>
        </Link>
        <p className="subtitle is-size-7">
          <span>Posted by: </span>
          <b>{author}</b>
          <span>{` at ${date}`}</span>
          <span> on </span>
          <Link to={`/${category}`}>
            <span className="is-link post-category">{capitalize(category)}</span>
          </Link>
        </p>
      </div>
      <div className="card-header-icon is-paddingless">
        <Options {...props} />
      </div>
    </header>
  );
};

export default PostHeader;
