import React from 'react';

import { Icon } from 'antd';

import Options from './options/Options';

const CommentHeader = (props) => {
  const { author, timestamp } = props;

  const date = new Date(timestamp).toLocaleDateString();

  return (
    <header className="card-header">
      <div className="post-header">
        <h1 className="is-size-6-mobile is-size-6 has-text-black comments__header--author">
          <Icon type="user" />
          {author}
        </h1>
        <p className="subtitle is-size-7 post-subtitle">
          <span>{`Commented at ${date}`}</span>
        </p>
      </div>
      <div className="card-header-icon is-paddingless">
        <Options {...props} />
      </div>
    </header>
  );
};

export default CommentHeader;
