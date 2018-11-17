import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { handleVote } from 'Actions/comments';

import { commentReplies } from 'Selectors/comments';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

import Vote from 'Components/vote/Vote';
import EditComment from './EditComment';
import CommentHeader from './CommentHeader';
import NewComment from './NewComment';
import RepliesWrapper from './replies/RepliesWrapper';

/**
 * @class Comment
 * @description Renders comment
 */
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
      parentId,
      setUpVote,
      setDownVote,
      replies,
    } = this.props;

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
                  <nav className="level is-mobile is-comment">
                    <Vote
                      id={id}
                      score={voteScore}
                      setUpVote={setUpVote}
                      setDownVote={setDownVote}
                    />
                    <a
                      role="button"
                      className="comment-reply"
                      onClick={this.toggleReply}
                    >
                      <FontAwesomeIcon icon={faReply} />
                      Reply
                    </a>
                  </nav>
                  <RepliesWrapper replies={replies} />
                  <div className="is-comment-reply">
                    {isReply && (
                      <NewComment
                        replyingTo={id}
                        parentId={parentId}
                        close={this.toggleReply}
                        fieldsNeeded={['author', 'message']}
                      />
                    )}
                  </div>

                </div>
              </article>
            </div>
          </div>
        )
    );
  }
}

const mapStateToProps = (state, props) => ({
  replies: commentReplies(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  setUpVote: (id) => {
    dispatch(handleVote(id, { option: 'upVote' }));
  },
  setDownVote: (id) => {
    dispatch(handleVote(id, { option: 'downVote' }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
