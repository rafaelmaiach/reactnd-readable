import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleVote } from 'Actions/posts';

import Vote from 'Components/vote/Vote';
import NewPost from './NewPost';
import PostHeader from './PostHeader';
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

  getDescription = () => {
    const { body, isPostDetailsPage } = this.props;

    if (isPostDetailsPage) {
      return body;
    }

    if (body) {
      const maxBodyWords = 25;
      const validBodyWords = body.split(' ').filter(word => word);
      const bodyHasMoreWords = validBodyWords.length > maxBodyWords;
      const reduceBodySize = bodyHasMoreWords ? validBodyWords.splice(0, 25) : validBodyWords;
      const bodyString = reduceBodySize.join(' ').trim();
      return bodyHasMoreWords ? `${bodyString}...` : bodyString;
    }

    return '';
  }

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
      setUpVote,
      setDownVote,
    } = this.props;

    const info = {
      id,
      title,
      message: body,
    };

    const description = this.getDescription();

    const postStyle = isPostDetailsPage ? '' : 'post-box--border';

    return (
      isEdition
        ? (
          <NewPost
            isBoxLayout={isBoxLayout}
            isEdition={isEdition}
            closeForm={this.toggleEdition}
            info={info}
          />
        )
        : (
          <div className={`column is-12-mobile ${isBoxLayout ? 'is-4' : 'is-8'}`}>
            <div className={`box post-box card-box ${postStyle}`}>
              <article className="media">
                <div className="media-content">
                  <PostHeader
                    {...this.props}
                    toggleEdition={this.toggleEdition}
                    onConfirm={this.onConfirm}
                  />
                  <p className="post-description is-size-7-mobile is-size-6">
                    {description}
                  </p>
                  <br />
                  <nav className="level is-mobile">
                    <Vote
                      id={id}
                      score={voteScore}
                      setUpVote={setUpVote}
                      setDownVote={setDownVote}
                    />
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

const mapDispatchToProps = dispatch => ({
  setUpVote: (id) => {
    dispatch(handleVote(id, { option: 'upVote' }));
  },
  setDownVote: (id) => {
    dispatch(handleVote(id, { option: 'downVote' }));
  },
});

export default connect(null, mapDispatchToProps)(Post);
