import React from 'react';

import { Icon } from 'antd';

/**
 * @constructor OptionsMenuItem
 * @param {object} props - OptionsMenuItem props
 * @description Create the item for options menu
 */
const OptionsMenuItem = (props) => {
  const {
    iconOptions, // the icon to be shown
    onClick = null, // click handle
    label,
    customLabel = null, // href for share item
  } = props;

  // If has custom label, it is a share item
  if (customLabel) {
    return (
      <span className="card-options-item">
        <Icon {...iconOptions} />
        <a className="card-share-item" href={customLabel} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </span>
    );
  }

  return (
    <a className="card-options-item" onClick={onClick}>
      <Icon {...iconOptions} />
      <span>{` ${label}`}</span>
    </a>
  );
};

export default OptionsMenuItem;
