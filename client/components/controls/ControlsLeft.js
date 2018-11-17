import React from 'react';

import ControlsLayout from './ControlsLayout';
import ControlsFilter from './ControlsFilter';

/**
 * @constructor ControlsLeft
 * @param {object} props - Controls left props
 * @description Renders the filter, sort and layout buttons
 */
const ControlsLeft = props => (
  <div className="column is-12-mobile is-9">
    <div className="columns is-flex">
      <ControlsFilter {...props} />
      <ControlsLayout />
    </div>
  </div>
);

export default ControlsLeft;
