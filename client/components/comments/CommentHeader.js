import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'antd';

import { timestampToDate } from 'Utils/common.helpers';

import { handleDeleteComment } from 'Actions/comments';

import Options from 'Components/options/Options';

const CommentHeader = (props) => {
  const {
    deleteComment,
    toggleEdition,
    ...rest
  } = props;

  const {
    id, author, timestamp, edited,
  } = rest;

  const date = timestampToDate(timestamp);
  const editedDate = edited ? timestampToDate(edited) : null;

  return (
    <header className="card-header comments__header">
      <div className="post-header">
        <h1 className="is-size-6-mobile is-size-6 has-text-black comments__header--author">
          <Icon type="user" />
          {author}
        </h1>
        <p className="subtitle is-size-7 post-subtitle">
          <span>{`Commented at ${date}`}</span>
          {editedDate && <i>{` - edited at ${editedDate}`}</i>}
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
