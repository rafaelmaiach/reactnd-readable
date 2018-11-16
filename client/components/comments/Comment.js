import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleVote } from 'Actions/comments';

import { commentReplies } from 'Selectors/comments';

import Vote from 'Components/vote/Vote';
import EditComment from './EditComment';
import CommentHeader from './CommentHeader';
import NewComment from './NewComment';

class Comment extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
  };

  state = {
    isEdition: false,
    isReply: false,
  }

  toggleEdition = () => this.setState(({ isEdition }) => ({ isEdition: !isEdition }));

  toggleReply = () => this.setState(({ isReply }) => ({ isReply: !isReply }));

  render() {
    const { isEdition, isReply } = this.state;
    const {
      id,
      body,
      voteScore,
      setUpVote,
      setDownVote,
      replies,
    } = this.props;

    console.log(replies);

    const info = {
      id,
      message: body,
    };

    return (
      isEdition
        ? (
          <EditComment
            isEdition
            cancelEdition={this.toggleEdition}
            info={info}
          />
        )
        : (
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
                    <button type="button" onClick={this.toggleReply}>Reply</button>
                  </nav>
                  {isReply && (
                    <NewComment
                      replyingTo={this.props.id}
                      parentId={this.props.parentId}
                      fieldsNeeded={['author', 'message']}
                    />
                  )}
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

export default connect(null, mapDispatchToProps)(Comment);
