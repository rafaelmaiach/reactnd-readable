import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ControlsLeft from './ControlsLeft';

/**
 * @constructor Controls
 * @param {object} props - Controls props
 * @description Creates the controls menu to render filter, sort and new post button
 */
const Controls = (props) => {
  const { onClick, ...controlsLeftProps } = props;

  return (
    <div className="column is-12 controls-container">
      <div className="columns is-centered">
        <div className="column is-8">
          <div className="columns is-multiline is-flex">
            <ControlsLeft {...controlsLeftProps} />
            <div className="column is-12-mobile is-3 control-new-post">
              <a
                role="button"
                className="button is-link is-pulled-right control-new-post-button"
                onClick={onClick}
              >
                New Post
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Controls.propTypes = {
  onClick: PropTypes.func.isRequired,
};

// Don't need to re-render the wrapper
const areEqual = () => true;

export default memo(Controls, areEqual);
