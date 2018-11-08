import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { handleAddPost, handleEditPost } from 'Actions/posts';

import Field from './NewPostField';

class NewPost extends Component {
  state = {
    title: '',
    author: '',
    message: '',
    category: '',
    invalidForm: false,
  }

  componentDidMount() {
    this.setupInitialState();
  }

  setupInitialState = () => {
    const { postInfo } = this.props;

    if (postInfo) {
      this.setState(() => ({
        title: postInfo.title,
        message: postInfo.message,
      }));
    }
  }

  fieldsSetup = [
    {
      id: 'title',
      domId: 'new-post-title',
      domType: 'input',
      label: 'Title',
    },
    {
      id: 'author',
      domId: 'new-post-author',
      domType: 'input',
      label: 'Author',
    },
    {
      id: 'message',
      domId: 'new-post-message',
      domType: 'textarea',
      label: 'Message',
    },
    {
      id: 'category',
      domId: 'new-post-category',
      domType: 'dropdown',
      label: 'Category',
    },
  ]

  handleFieldValue = field => value => this.setState(() => ({ [field]: value }));

  createPost = () => {
    const {
      addPost,
      updatePost,
      toggleNewPost,
      postInfo,
      cancelEdition,
    } = this.props;

    const {
      title, author, message, category,
    } = this.state;

    let postIsValid = false;
    let postData = null;

    if (postInfo) {
      postIsValid = title.trim() && message.trim();
      const { id } = postInfo;
      postData = {
        id,
        details: {
          title: title.trim(),
          body: message.trim(),
        },
      };
    } else {
      postIsValid = title.trim() && message.trim() && author.trim() && category.trim();
      postData = {
        id: uuid(),
        timestamp: Date.now(),
        title: title.trim(),
        body: message.trim(),
        author: author.trim(),
        category,
      };
    }

    if (postIsValid) {
      if (postInfo) {
        updatePost(postData);
        cancelEdition();
        return;
      }

      addPost(postData);
      toggleNewPost();
    } else {
      this.setState(() => ({ invalidForm: true }));
    }
  }

  createFields = (postInfo) => {
    const { category } = this.state;
    const usedFields = postInfo
      ? this.fieldsSetup.filter(({ id }) => id === 'title' || id === 'message')
      : this.fieldsSetup;

    return usedFields.map(field => (
      <Field
        key={field.domId}
        {...field}
        handleField={this.handleFieldValue(field.id)}
        category={category}
        {...postInfo}
      />
    ));
  }

  render() {
    const { invalidForm } = this.state;

    const { cancelEdition, postInfo } = this.props;

    const fields = this.createFields(postInfo);

    return (
      <div className="column is-7 is-offset-2">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                { fields }
              </div>
            </div>
          </div>
          {invalidForm && <p className="help is-danger has-text-centered">Form is invalid!</p>}
          <footer className="card-footer">
            <a role="button" className="card-footer-item" onClick={this.createPost}>
              {postInfo ? 'Save' : 'Create'}
            </a>
            {postInfo && <a role="button" className="card-footer-item" onClick={cancelEdition}>Cancel</a>}
          </footer>
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
