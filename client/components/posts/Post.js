import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Popconfirm, message } from 'antd';

import { handleDeletePost } from 'Actions/posts';

import NewPost from './NewPost';
import Vote from './Vote';

class Post extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    deletePost: PropTypes.func.isRequired,
  };

  state = {
    isEdition: false,
  }

  toggleEdition = () => this.setState(({ isEdition }) => ({ isEdition: !isEdition }));

  onConfirm = () => {
    const { id, title, deletePost } = this.props;

    deletePost(id);

    message.success(
      <span className="notification is-success">
        {`${title} delete successful!`}
      </span>
    );
  };

  onCancel = () => {
    const { title } = this.props;
    message.error(
      <span className="notification is-danger">
        {`${title} delete canceled!`}
      </span>
    );
  };

  render() {
    const { isEdition } = this.state;
    const {
      id,
      category,
      title,
      author,
      body,
      timestamp,
      commentCount,
      voteScore,
    } = this.props;

    const postInfo = {
      id,
      title,
      message: body,
    };

    return (
      isEdition
        ? <NewPost isEdition={isEdition} cancelEdition={this.toggleEdition} postInfo={postInfo} />
        : (
          <div className="column is-6">
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <Link to={`/${category}/${id}`}>
                      <p className="title is-4">{title}</p>
                    </Link>
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
                <a role="button" className="card-footer-item" onClick={this.toggleEdition}>Edit</a>
                <Popconfirm title="Are you sure delete this post?" onConfirm={this.onConfirm} onCancel={this.onCancel} okText="Yes" cancelText="No">
                  <a role="button" className="card-footer-item">Delete</a>
                </Popconfirm>
              </footer>
            </div>
          </div>
        )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: (postId) => {
    dispatch(handleDeletePost(postId));
  },
});

export default connect(null, mapDispatchToProps)(Post);
