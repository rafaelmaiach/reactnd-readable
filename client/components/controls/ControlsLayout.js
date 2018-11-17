import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setAppLayout } from 'Actions/layout.creator';
import { getLayoutValue } from 'Selectors/layout';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThLarge } from '@fortawesome/free-solid-svg-icons';

/**
 * @constructor ConstrolsLayout
 * @param {boolean} isBoxLayout - check if the layout is box or not
 * @param {function} handleAppLayout - function to change layout
 * @description Renders the control layout buttons
 */
const ControlsLayout = ({ isBoxLayout, handleAppLayout }) => {
  const normalLayout = !isBoxLayout ? '-active' : '';
  const boxLayout = isBoxLayout ? '-active' : '';

  const setNormalLayout = () => handleAppLayout('normal');
  const setBoxLayout = () => handleAppLayout('box');

  return (
    <div className="column is-4-mobile is-4 control-filters__container">
      <span className="control-filters--label">Layout:</span>
      <div className="control-filters--layout">
        <a
          onClick={setNormalLayout}
          className={`control-filters--layout-button${normalLayout}`}
        >
          <FontAwesomeIcon icon={faBars} />
        </a>
        <a
          onClick={setBoxLayout}
          className={`control-filters--layout-button${boxLayout}`}
        >
          <FontAwesomeIcon icon={faThLarge} />
        </a>
      </div>
    </div>
  );
};

ControlsLayout.propTypes = {
  isBoxLayout: PropTypes.bool,
  handleAppLayout: PropTypes.func.isRequired,
};

ControlsLayout.defaultProps = {
  isBoxLayout: false,
};

const mapStateToProps = state => ({
  isBoxLayout: getLayoutValue(state),
});

const mapDispatchToProps = dispatch => ({
  handleAppLayout: (layout) => {
    dispatch(setAppLayout(layout));
  },
});

const areEqual = (prev, next) => prev.isBoxLayout === next.isBoxLayout;

export default connect(mapStateToProps, mapDispatchToProps)(memo(ControlsLayout, areEqual));
