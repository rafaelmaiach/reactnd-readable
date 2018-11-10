import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { handleAddPost, handleEditPost } from 'Actions/posts';
import Form from 'Components/form/Form';

class NewPost extends Component {
  createNewPost = (data) => {
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

  updateExistingPost = (data) => {
    const { title, message } = data;

    const {
      postInfo: { id },
      updatePost,
      cancelEdition,
    } = this.props;

    // Create the data for update a post
    const postData = {
      id,
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
            <Form
              {...this.props}
              isEdition={isEdition}
              createPost={this.createNewPost}
              updatePost={this.updateExistingPost}
            />
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
