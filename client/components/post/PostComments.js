import React from 'react';
import { Icon } from 'antd';

const PostComments = ({ score }) => (
  <div className="level-right">
    <span className="level-item">
      <Icon type="message" style={{ color: '#06addb' }} />
    </span>
    <span className="level-item is-size-7" aria-label="comment count">
      {`${score} comments`}
    </span>
  </div>
);

export default PostComments;
