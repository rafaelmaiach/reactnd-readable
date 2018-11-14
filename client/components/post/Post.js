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
    isBoxLayout: PropTypes.bool,
  };

  static defaultProps = {
    isBoxLayout: false,
  }

  state = {
    isEdition: false,
  }

  toggleEdition = () => this.setState(({ isEdition }) => ({ isEdition: !isEdition }));

  render() {
    const { isEdition } = this.state;
    const {
      id,
      title,
      body,
      commentCount,
      voteScore,
      isPostDetailsPage,
      isBoxLayout,
    } = this.props;

    const postInfo = {
      id,
      title,
      message: body,
    };

    let description = body;

    if (!isPostDetailsPage) {
      const maxBodyWords = 25;
      const validBodyWords = body.split(' ').filter(word => word);
      const bodyHasMoreWords = validBodyWords.length > maxBodyWords;
      const reduceBodySize = bodyHasMoreWords ? validBodyWords.splice(0, 25) : validBodyWords;
      const bodyString = reduceBodySize.join(' ').trim();
      description = bodyHasMoreWords ? `${bodyString}...` : bodyString;
    }

    return (
      isEdition
        ? (
          <NewPost
            isBoxLayout={isBoxLayout}
            isEdition={isEdition}
            closeForm={this.toggleEdition}
            postInfo={postInfo}
          />
        )
        : (
          <div className={`column ${isBoxLayout ? 'is-4' : 'is-8'}`}>
            <div className="box post-box">
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <div className="media-content">
                      <PostHeader
                        {...this.props}
                        toggleEdition={this.toggleEdition}
                        onConfirm={this.onConfirm}
                      />
                      <p className="post-description is-size-7-mobile is-size-6">
                        {description}
                      </p>
                    </div>
                  </div>
                  <br />
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
