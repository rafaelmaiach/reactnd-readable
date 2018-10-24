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
      body,
      timestamp,
      commentCount,
      voteScore,
    } = this.props;

    const date = new Date(timestamp).toLocaleDateString();

    return (
      <div className="column is-7 is-offset-2">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{title}</p>
                <p className="subtitle is-6">{author}</p>
              </div>
            </div>

            <div className="content">
              {body}
              <br />
              <time>{date}</time>
            </div>
          </div>
          <footer className="card-footer">
            <a role="button" className="card-footer-item">Edit</a>
            <a role="button" className="card-footer-item" onClick={() => this.removePost(id)}>Delete</a>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect()(Post);
