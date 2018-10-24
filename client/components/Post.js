import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleDeletePost } from 'Actions/posts';

class Post extends Component {
  removePost = (postId) => {
    const { dispatch } = this.props;
    dispatch(handleDeletePost(postId));
  }

  render() {
    const {
      id,
      title,
      author,
      commentCount,
      voteScore,
    } = this.props;

    return (
      <div>
        <h3>{`Title: ${title}`}</h3>
        <h4>{`Author: ${author}`}</h4>
        <h6>{`Comments: ${commentCount}`}</h6>
        <h6>{`Votes: ${voteScore}`}</h6>
        <button type="button" onClick={() => this.removePost(id)}>DELETE POST</button>
      </div>
    );
  }
}

export default connect()(Post);
