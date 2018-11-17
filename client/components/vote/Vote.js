import React, { memo } from 'react';
import PropTypes from 'prop-types';

import VoteIcon from './VoteIcon';

/**
 * @constructor Vote
 * @param {object} props - Vote props
 * @description Creates the vote controls on post card
 */
const Vote = (props) => {
  const {
    id, // post or comment id
    score, // vote score
    setUpVote, // function to increase vote count
    setDownVote, // function to decrease vote count
  } = props;

  const upVote = () => setUpVote(id);
  const downVote = () => setDownVote(id);

  return (
    <div className="level-left">
      <VoteIcon type="caret-up" handleVote={upVote} />
      <span className="level-item has-text-centered is-size-7" aria-label="vote score">
        {score}
      </span>
      <VoteIcon type="caret-down" handleVote={downVote} />
    </div>
  );
};

Vote.propTypes = {
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  setUpVote: PropTypes.func.isRequired,
  setDownVote: PropTypes.func.isRequired,
};

// Optimize performance to not re-render unecessary
const areEqual = (prevProps, nextProps) => prevProps.score === nextProps.score;

export default memo(Vote, areEqual);
