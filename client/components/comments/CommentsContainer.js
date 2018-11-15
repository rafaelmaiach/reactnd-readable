import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { receiveComments } from 'Actions/posts';

import { commentsValuesSelector } from 'Selectors/comments';

import Comment from 'Components/comments/Comment';

class CommentsContainer extends Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    getPostComments: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string,
      body: PropTypes.string,
      deleted: PropTypes.bool,
      id: PropTypes.string,
      parentDeleted: PropTypes.bool,
      parentId: PropTypes.string,
      timestamp: PropTypes.number,
      voteScore: PropTypes.number,
    })).isRequired,
    commentsCount: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const {
      postId,
      getPostComments,
    } = this.props;

    getPostComments(postId);
  }

  getCommentsTitle = (count) => {
    switch (count) {
      case 0:
        return 'No comments';
      case 1:
        return '1 comment';
      default:
        return `${count} comments`;
    }
  }

  createComment = commentDetails => <Comment key={commentDetails.id} {...commentDetails} />

  render() {
    const { comments, commentsCount } = this.props;

    console.log('COMMENTS', comments);

    const postComments = comments.map(this.createComment);

    const commentsContainerTitle = this.getCommentsTitle(commentsCount);

    return (
      <div className="columns is-multiline is-centered comments__container">
        <div className="column is-12-mobile is-8 comments__header">
          <p className="title is-size-6-mobile is-size-6 comments__header--text">
            {commentsContainerTitle}
          </p>
        </div>
        {postComments}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: commentsValuesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getPostComments: (postId) => {
    dispatch(receiveComments(postId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);
