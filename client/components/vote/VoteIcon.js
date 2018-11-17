import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

/**
 * @constructor VoteIcon
 * @param {object} props - Vote icon props
 * @description Creates the buttons to handle vote
 */
const VoteIcon = (props) => {
  const {
    type, // defines the icon
    handleVote, // function handler to be triggered on click
  } = props;

  return (
    <a onClick={handleVote} className="level-item has-text-centered">
      <Icon type={type} />
    </a>
  );
};

VoteIcon.propTypes = {
  type: PropTypes.string.isRequired,
  handleVote: PropTypes.func.isRequired,
};

// Optimize performance to not re-render unecessary
const areEqual = (prevProps, nextProps) => prevProps.type === nextProps.type;

export default memo(VoteIcon, areEqual);
