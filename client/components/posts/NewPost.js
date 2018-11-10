import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { handleAddPost, handleEditPost } from 'Actions/posts';
import FormCreate from './FormCreate';
import FormEdition from './FormEdition';

class NewPost extends Component {
  createPost = (data) => {
    const {
      title, author, message, category,
    } = data;

    const { addPost, toggleNewPost } = this.props;

    // Create the data for a new post
    const postData = {
      id: uuid(),
      timestamp: Date.now(),
      title,
      body: message,
      author,
      category,
    };

    addPost(postData);
    toggleNewPost();
  }

  updatePost = (data) => {
    const { title, message } = data;

    const {
      updatePost,
      postInfo,
      cancelEdition,
    } = this.props;

    // Create the data for update a post
    const postData = {
      id: postInfo.id,
      details: {
        title,
        body: message,
      },
    };

    updatePost(postData);
    cancelEdition();
  }

  render() {
    const { isEdition } = this.props;
    const size = isEdition ? 'is-6' : 'is-7';
    return (
      <div className={`column ${size}`}>
        <div className="card">
          <div className="card-content">
            {isEdition
              ? <FormEdition {...this.props} updatePost={this.updatePost} />
              : <FormCreate {...this.props} createPost={this.createPost} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addPost: (post) => {
    dispatch(handleAddPost(post));
  },
  updatePost: (post) => {
    dispatch(handleEditPost(post));
  },
});

export default connect(null, mapDispatchToProps)(NewPost);
