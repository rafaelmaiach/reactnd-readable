import React from 'react';
import PropTypes from 'prop-types';

import Reply from './Reply';

/**
 * @constructor RepliesWrapper
 * @param {replies} replies - Replies object
 * @description Creates the replies wrapper
 */
const RepliesWrapper = ({ replies }) => {
  if (!replies) {
    return null;
  }

  const allReplies = replies.map(reply => <Reply key={reply.id} {...reply} />);

  return (
    <div className="replies__container">
      {allReplies}
    </div>
  );
};

RepliesWrapper.propTypes = {
  replies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RepliesWrapper;
