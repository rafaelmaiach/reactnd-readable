import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';

/**
 * @constructor PostComments
 * @param {number} score - Post comment count
 * @description Renders the post comments count information
 */
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

PostComments.propTypes = {
  score: PropTypes.number.isRequired,
};

const areEqual = (prev, next) => prev.score === next.score;

export default memo(PostComments, areEqual);
