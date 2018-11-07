import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from './NewPostField';

class NewPost extends Component {
  state = {
    title: '',
    author: '',
    message: '',
    category: '',
  }

  handleFieldValue = field => value => this.setState(() => ({ [field]: value }));

  // const post = {
  //   id: uuid(),
  //   timestamp: Date.now(),
  //   title: 'A new post',
  //   body: 'A new post body',
  //   author: 'A new post author',
  //   category: 'react',
  // };

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

  render() {
    const { category } = this.state;
    const fields = this.fieldsSetup.map(field => <Field key={field.domId} {...field} handleField={this.handleFieldValue(field.id)} category={category} />);
    console.log(this.state);
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
        </div>
      </div>
    );
  }
}

export default connect()(NewPost);
