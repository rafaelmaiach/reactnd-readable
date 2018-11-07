import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleDeletePost } from 'Actions/posts';

import NewPost from './NewPost';

class Post extends Component {
  state = {
    isEditting: false,
  }

  removePost = () => {
    const { id, deletePost } = this.props;
    deletePost(id);
  }

  togglePostEdition = () => this.setState(({ isEditting }) => ({ isEditting: !isEditting }));

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

    const { isEditting } = this.state;

    const postInfo = {
      id,
      title,
      message: body,
    };

    const date = new Date(timestamp).toLocaleDateString();

    return (
      isEditting
        ? <NewPost cancelEdition={this.togglePostEdition} postInfo={postInfo} />
        : (
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
                <a role="button" className="card-footer-item" onClick={this.togglePostEdition}>Edit</a>
                <a role="button" className="card-footer-item" onClick={this.removePost}>Delete</a>
              </footer>
            </div>
          </div>
        )
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deletePost: (postId) => {
    dispatch(handleDeletePost(postId));
  },
});

export default connect(null, mapDispatchToProps)(Post);
