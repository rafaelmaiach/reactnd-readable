import React from 'react';
import { connect } from 'react-redux';

import { Icon } from 'antd';

import { handleVote } from 'Actions/posts';

const Vote = (props) => {
  const {
    postId,
    score,
    setUpVote,
    setDownVote,
  } = props;

  return (
    <div className="level-left">
      <a onClick={() => setUpVote(postId)} className="level-item has-text-centered" aria-label="vote count">
        <Icon type="caret-up" style={{ color: '#16c26b' }} />
      </a>
      <span className="level-item has-text-centered is-size-6" aria-label="vote count">
        {score}
      </span>
      <a onClick={() => setDownVote(postId)} className="level-item has-text-centered" aria-label="vote count">
        <Icon type="caret-up" style={{ color: '#ff3860' }} />
      </a>

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
