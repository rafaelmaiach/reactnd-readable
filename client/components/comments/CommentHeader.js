import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Icon } from 'antd';

import { timestampToDate } from 'Utils/common.helpers';

import { handleDeleteComment } from 'Actions/comments';

import Options from 'Components/options/Options';

/**
 * @constructor CommentHeader
 * @param {object} props - CommentHeader props
 */
const CommentHeader = (props) => {
  const {
    deleteComment,
    toggleEdition,
    comments,
    ...rest
  } = props;

  const {
    id, author, timestamp, parentId, edited,
  } = rest;

  const date = timestampToDate(timestamp);
  const editedDate = edited ? timestampToDate(edited) : null;

  const commentDelete = deleteComment(comments, parentId);

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
          onDelete={commentDelete}
          deleteModalTitle="Delete comment"
          onEdit={toggleEdition}
        />
      </div>
    </header>
  );
};

CommentHeader.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  toggleEdition: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired, // eslint-disable-line
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  parentId: PropTypes.string.isRequired,
  edited: PropTypes.number,
};

CommentHeader.defaultProps = {
  edited: null,
};

const mapStateToProps = ({ comments }) => ({
  comments,
});

const mapDispatchToProps = dispatch => ({
  deleteComment: (comments, parentId) => (commentId) => {
    Object.keys(comments).forEach((key) => {
      if (comments[key].replyingTo && comments[key].replyingTo === commentId) {
        dispatch(handleDeleteComment(comments[key].id, parentId));
      }
    });

    dispatch(handleDeleteComment(commentId, parentId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentHeader);
