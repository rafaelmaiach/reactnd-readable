import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NewPost from './NewPost';
import PostHeader from './PostHeader';
import PostVote from './PostVote';
import PostComments from './PostComments';

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
  };

  state = {
    isEdition: false,
  }

  toggleEdition = () => this.setState(({ isEdition }) => ({ isEdition: !isEdition }));

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
        ? <NewPost isEdition={isEdition} closeForm={this.toggleEdition} postInfo={postInfo} />
        : (
          <div className="column is-7">
            <div className="box">
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <div className="media-content">
                      <PostHeader
                        {...this.props}
                        toggleEdition={this.toggleEdition}
                        onConfirm={this.onConfirm}
                      />
                      <p className="post-description is-size-6">
                        {body}
                      </p>
                    </div>
                  </div>
                  <nav className="level is-mobile">
                    <PostVote postId={id} score={voteScore} />
                    <PostComments score={commentCount} />
                  </nav>
                </div>
              </article>
            </div>
          </div>
        )
    );
  }
}

export default Post;
