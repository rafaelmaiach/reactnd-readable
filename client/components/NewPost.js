import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCheck } from '@fortawesome/free-solid-svg-icons';

class NewPost extends Component {
  state = {

  }

  render() {
    return (
      <div className="column is-7 is-offset-2">
        <div className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <div className="field is-horizontal">
                  <div className="field-label is-large">
                    <label className="label">Title</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input is-large" type="text" placeholder="Post title" />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Author</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <input className="input" type="text" placeholder="Post author" />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Message</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control">
                        <textarea className="textarea" maxLength={250} placeholder="Post message (max. 250 characters)" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(NewPost);
