import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Popconfirm, message } from 'antd';

import { handleDeletePost } from 'Actions/posts';

import { capitalize } from 'Utils/common.helpers';

import NewPost from './NewPost';
import VoteScore from './VoteScore';
import CommentScore from './CommentScore';
import Options from './Options';

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

    const date = new Date(timestamp).toLocaleDateString();

    return (
      isEdition
        ? <NewPost isEdition={isEdition} closeForm={this.toggleEdition} postInfo={postInfo} />
        : (
          <div className="column is-7">
            <div className="box">
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <div className="media-content">
                      <header className="card-header">
                        <div className="post-header">
                          <Link to={`/${category}/${id}`}>
                            <p className="is-size-5-mobile is-size-4 has-text-link">
                              {title}
                            </p>
                          </Link>
                          <p className="subtitle is-size-7">
                            <span>Posted by: </span>
                            <b>{author}</b>
                            <span>{` at ${date}`}</span>
                            <span> on </span>
                            <Link to={`/${category}`}>
                              <span className="is-link">{capitalize(category)}</span>
                            </Link>
                          </p>
                        </div>
                        <div className="card-header-icon is-paddingless">
                          <Options
                            id={id}
                            category={category}
                            toggleEdition={this.toggleEdition}
                            onConfirm={this.onConfirm}
                            onCancel={this.onCancel}
                          />
                        </div>
                      </header>
                      <p className="post-description is-size-6">{body}</p>
                    </div>
                  </div>
                  <nav className="level is-mobile">
                    <VoteScore postId={id} score={voteScore} />
                    <CommentScore score={commentCount} />
                  </nav>
                </div>
              </article>
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
