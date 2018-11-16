import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleDeletePost } from 'Actions/posts';

import { capitalize, timestampToDate } from 'Utils/common.helpers';

import Options from 'Components/options/Options';

const PostHeader = (props) => {
  const {
    deletePost,
    toggleEdition,
    ...rest
  } = props;

  const {
    id, author, title, category, timestamp, edited,
  } = rest;

  const date = timestampToDate(timestamp);
  const editedDate = edited ? timestampToDate(edited) : null;

  const { origin } = window.location;
  const postUrl = `${origin}/${category}/${id}`;

  return (
    <header className="card-header">
      <div className="post-header">
        <Link to={`/${category}/${id}`}>
          <p className="is-size-5-mobile is-size-4 has-text-link post-title">
            {title}
          </p>
        </Link>
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
      </div>
      <div className="card-header-icon is-paddingless">
        <Options
          id={id}
          onDelete={deletePost}
          deleteModalTitle={title}
          onEdit={toggleEdition}
          shareOption
          url={postUrl}
        />
      </div>
    </header>
  );
};

const mapDispatchToProps = dispatch => ({
  deletePost: (postId) => {
    dispatch(handleDeletePost(postId));
  },
});

export default connect(null, mapDispatchToProps)(PostHeader);
