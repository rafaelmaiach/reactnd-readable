import React from 'react';
import { connect } from 'react-redux';

import { handleVote } from 'Actions/posts';

const Vote = (props) => {
  const {
    postId,
    score,
    setUpVote,
    setDownVote,
  } = props;

  return (
    <div>
      <p>{`Votes: ${score}`}</p>
      <span onClick={() => setUpVote(postId)}>Up</span>
      <span onClick={() => setDownVote(postId)}>Down</span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setUpVote: (id) => {
    dispatch(handleVote(id, { option: 'upVote' }));
  },
  setDownVote: (id) => {
    dispatch(handleVote(id, { option: 'downVote' }));
  },
});

export default connect(null, mapDispatchToProps)(Vote);
