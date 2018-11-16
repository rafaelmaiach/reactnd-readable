import React from 'react';

import Reply from './Reply';

const createReply = reply => <Reply key={reply.id} {...reply} />;

const RepliesWrapper = ({ replies }) => {
  if (!replies) {
    return null;
  }

  const allReplies = replies.map(createReply);

  return (
    <div className="replies__container">
      {allReplies}
    </div>
  );
};

export default RepliesWrapper;
