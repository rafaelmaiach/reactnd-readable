import React, { Component, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleVote } from 'Actions/posts';

import Vote from 'Components/vote/Vote';
import NewPost from './NewPost';
import PostHeader from './PostHeader';
import PostComments from './PostComments';
import PostDescription from './PostDescription';

/**
 * @class Post
 * @description create the post card
 */
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

  /**
   * @method Post#toggleEdition
   * @description toggle the card to edit or not
   */
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
      setUpVote,
      setDownVote,
    } = this.props;

    const info = {
      id,
      title,
      message: body,
    };

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
          <div className={`column ${isBoxLayout ? 'is-6-mobile is-4 is-box-layout' : 'is-12-mobile is-8'}`}>
            <div className={`box post-box card-box ${postStyle}`}>
              <article className="media">
                <div className="media-content">
                  <PostHeader
                    {...this.props}
                    toggleEdition={this.toggleEdition}
                    onConfirm={this.onConfirm}
                  />
                  <PostDescription body={body} isDetailsPage={isPostDetailsPage} />
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

const areEqual = (prev, next) => {
  const titleEqual = prev.title === next.title;
  const bodyEqual = prev.body === next.body;
  const commentCountEqual = prev.commentCount === next.commentCount;
  const voteScoreEqual = prev.voteScore === next.voteScore;
  const layoutEqual = prev.isBoxLayout === next.isBoxLayout;

  return titleEqual && bodyEqual && commentCountEqual && voteScoreEqual && layoutEqual;
};

export default connect(null, mapDispatchToProps)(memo(Post, areEqual));
