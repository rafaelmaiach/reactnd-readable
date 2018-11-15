import React from 'react';

import { Icon } from 'antd';

const Vote = (props) => {
  const {
    id,
    score,
    setUpVote,
    setDownVote,
  } = props;

  const upVote = () => setUpVote(id);
  const downVote = () => setDownVote(id);

  return (
    <div className="level-left">
      <a onClick={upVote} className="level-item has-text-centered" aria-label="vote count up">
        <Icon type="caret-up" />
      </a>
      <span className="level-item has-text-centered is-size-7" aria-label="vote score">
        {score}
      </span>
      <a onClick={downVote} className="level-item has-text-centered" aria-label="vote count down">
        <Icon type="caret-down" />
      </a>

    </div>

  );
};

export default Vote;
