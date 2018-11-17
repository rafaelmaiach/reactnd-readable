import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleDeletePost } from 'Actions/posts';

import Options from 'Components/options/Options';
import PostHeaderTitle from './PostHeaderTitle';
import PostHeaderSubtitle from './PostHeaderSubtitle';

/**
 * @constructor PostHeader
 * @param {object} props - Post header props
 * @description Renders the post header on card
 */
const PostHeader = (props) => {
  const {
    deletePost,
    toggleEdition,
    ...rest
  } = props;

  const {
    id, author, title, category, timestamp, edited,
  } = rest;

  const { origin } = window.location;
  const postUrl = `${origin}/${category}/${id}`;

  return (
    <header className="card-header">
      <div className="post-header">
        <PostHeaderTitle
          id={id}
          title={title}
          category={category}
        />
        <PostHeaderSubtitle
          author={author}
          timestamp={timestamp}
          category={category}
          edited={edited}
        />
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

PostHeader.propTypes = {
  deletePost: PropTypes.func.isRequired,
  toggleEdition: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  edited: PropTypes.number,
};

PostHeader.defaultProps = {
  edited: null,
};

const mapDispatchToProps = dispatch => ({
  deletePost: (postId) => {
    dispatch(handleDeletePost(postId));
  },
});

const areEqual = (prev, next) => {
  const titleEqual = prev.title === next.title;
  const editedEqual = prev.edited === next.edited;

  return titleEqual && editedEqual;
};

export default connect(null, mapDispatchToProps)(memo(PostHeader, areEqual));
