import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Popconfirm, message } from 'antd';

import { handleDeletePost } from 'Actions/posts';

import NewPost from './NewPost';
import Vote from './Vote';


const Post = (props) => {
  const [isEdition, toggleEdition] = useState(false);

  const {
    id,
    title,
    author,
    body,
    timestamp,
    commentCount,
    voteScore,
    deletePost,
  } = props;

  const postInfo = {
    id,
    title,
    message: body,
  };

  const togglePostEdition = () => toggleEdition(!isEdition);

  const onConfirm = () => {
    deletePost(id);
    message.success(
      <span className="notification is-success">
        {`${title} delete successful!`}
      </span>, 500
    );
  };

  const onCancel = () => message.error(
    <span className="notification is-danger">
      {`${title} delete canceled!`}
    </span>, 500
  );

  return (
    isEdition
      ? <NewPost isEdition={isEdition} cancelEdition={togglePostEdition} postInfo={postInfo} />
      : (
        <div className="column is-6">
          <div className="card">
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{title}</p>
                  <p className="subtitle is-6">{author}</p>
                </div>
              </div>

              <div className="content">
                {body}
                <br />
                <br />
                <p>{`Time: ${timestamp}`}</p>
                <p>{`Comments: ${commentCount}`}</p>
                <Vote postId={id} score={voteScore} />
              </div>
            </div>
            <footer className="card-footer">
              <a role="button" className="card-footer-item" onClick={togglePostEdition}>Edit</a>
              <Popconfirm title="Are you sure delete this post?" onConfirm={onConfirm} onCancel={onCancel} okText="Yes" cancelText="No">
                <a role="button" className="card-footer-item">Delete</a>
              </Popconfirm>
            </footer>
          </div>
        </div>
      )
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  voteScore: PropTypes.number.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deletePost: (postId) => {
    dispatch(handleDeletePost(postId));
  },
});

export default connect(null, mapDispatchToProps)(Post);
