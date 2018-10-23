import React from 'react';

const Post = (props) => {
  const {
    title,
    author,
    commentCount,
    voteScore,
  } = props;

  return (
    <div>
      <h3>{`Title: ${title}`}</h3>
      <h4>{`Author: ${author}`}</h4>
      <h6>{`Comments: ${commentCount}`}</h6>
      <h6>{`Votes: ${voteScore}`}</h6>
    </div>
  );
};

export default Post;
