import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'antd';

import { handleDeleteComment } from 'Actions/comments';

import Options from 'Components/options/Options';

const CommentHeader = (props) => {
  const {
    deleteComment,
    toggleEdition,
    ...rest
  } = props;

  const { id, author, timestamp } = rest;

  const date = new Date(timestamp).toLocaleDateString();

  return (
    <header className="card-header">
      <div className="post-header">
        <h1 className="is-size-6-mobile is-size-6 has-text-black comments__header--author">
          <Icon type="user" />
          {author}
        </h1>
        <p className="subtitle is-size-7 post-subtitle">
          <span>{`Commented at ${date}`}</span>
        </p>
      </div>
      <div className="card-header-icon is-paddingless">
        <Options
          id={id}
          onDelete={deleteComment}
          deleteModalTitle="Delete comment"
          onEdit={toggleEdition}
        />
      </div>
    </header>
  );
};

const mapDispatchToProps = dispatch => ({
  deleteComment: (commentId) => {
    dispatch(handleDeleteComment(commentId));
  },
});

export default connect(null, mapDispatchToProps)(CommentHeader);
