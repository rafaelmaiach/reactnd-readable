import React from 'react';
import PropTypes from 'prop-types';

const ControlButtons = (props) => {
  const { onClick } = props;

  return (
    <div className="column is-12">
      <div className="columns is-centered">
        <div className="column is-7">
          <div className="columns">
            <div className="column is-6">Filter buttons</div>
            <div className="column is-6">
              <a role="button" className="button is-link is-pulled-right" onClick={onClick}>New Post</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ControlButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ControlButtons;
