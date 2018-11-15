import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleVote } from 'Actions/comments';

// import NewPost from 'Components/post/NewPost';
import Vote from 'Components/vote/Vote';
import CommentHeader from './CommentHeader';

class Comment extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
  };

  state = {
    // isEdition: false,
  }

  toggleEdition = () => this.setState(({ isEdition }) => ({ isEdition: !isEdition }));

  render() {
    // const { isEdition } = this.state;
    const {
      id,
      // author,
      body,
      voteScore,
      setUpVote,
      setDownVote,
    } = this.props;

    return (
      // isEdition
      //   ? (
      //     {<NewPost
      //       isBoxLayout={isBoxLayout}
      //       isEdition={isEdition}
      //       closeForm={this.toggleEdition}
      //       postInfo={postInfo}
      //     />}
      //   )
      //   : (
      <div className="column is-12-mobile is-8 comment__container">
        <div className="box card-box is-paddingless">
          <article className="media">
            <div className="media-content">
              <CommentHeader
                {...this.props}
                toggleEdition={this.toggleEdition}
                onConfirm={this.onConfirm}
              />
              <p className="comment-description is-size-7-mobile is-size-6">
                {body}
              </p>
              <br />
              <nav className="level is-mobile">
                <Vote
                  id={id}
                  score={voteScore}
                  setUpVote={setUpVote}
                  setDownVote={setDownVote}
                />
              </nav>
            </div>
          </article>
        </div>
      </div>
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

export default connect(null, mapDispatchToProps)(Comment);
