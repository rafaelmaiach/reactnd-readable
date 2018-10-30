import React, { Component } from 'react';
import { connect } from 'react-redux';

import Field from './NewPostField';

class NewPost extends Component {
  state = {

  }

  fieldsSetup = [
    {
      domId: 'new-post-title',
      domType: 'input',
      label: 'Title',
    },
    {
      domId: 'new-post-author',
      domType: 'input',
      label: 'Author',
    },
    {
      domId: 'new-post-message',
      domType: 'textarea',
      label: 'Message',
    },
    {
      domId: 'new-post-category',
      domType: 'dropdown',
      label: 'Category',
    },
  ]

  render() {
    const fields = this.fieldsSetup.map(field => <Field key={field.domId} {...field} />);
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
