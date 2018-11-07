import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { handleAddPost } from 'Actions/posts';

import Field from './NewPostField';

class NewPost extends Component {
  state = {
    title: '',
    author: '',
    message: '',
    category: '',
    invalidForm: false,
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
    const { dispatch, toggleNewPost } = this.props;

    const {
      title, author, message, category,
    } = this.state;

    const postIsValid = title.trim() && author.trim() && message.trim() && category.trim();

    if (postIsValid) {
      const post = {
        id: uuid(),
        timestamp: Date.now(),
        title: title.trim(),
        body: message.trim(),
        author: author.trim(),
        category,
      };

      dispatch(handleAddPost(post));

      toggleNewPost();
    } else {
      this.setState(() => ({ invalidForm: true }));
    }
  }

  render() {
    const { category, invalidForm } = this.state;

    const fields = this.fieldsSetup.map(field => (
      <Field
        key={field.domId}
        {...field}
        handleField={this.handleFieldValue(field.id)}
        category={category}
      />
    ));

    return (
      <div className="column is-7 is-offset-2">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                {fields}
              </div>
            </div>
          </div>
          {invalidForm && <p className="help is-danger has-text-centered">Form is invalid!</p>}
          <footer className="card-footer">
            <a role="button" className="card-footer-item" onClick={this.createPost}>
              Create
            </a>
          </footer>
        </div>
      </div>
    );
  }
}

export default connect()(NewPost);
