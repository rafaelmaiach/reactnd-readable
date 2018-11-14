import React from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThLarge } from '@fortawesome/free-solid-svg-icons';

import { setAppLayout } from 'Actions/layout.creator';
import { getLayoutValue } from 'Selectors/layout';

import { Select } from 'antd';
const { Option } = Select;

const ControlsLeft = (props) => {
  const {
    sortBy, handleSort, isBoxLayout, handleAppLayout,
  } = props;

  const filterByType = (type) => {
    const { order } = sortBy;
    handleSort({
      type,
      order,
    });
  };

  const filterByOrder = (order) => {
    const { type } = sortBy;
    handleSort({
      type,
      order,
    });
  };

  const normalLayout = !isBoxLayout ? '-active' : '';
  const boxLayout = isBoxLayout ? '-active' : '';

  return (
    <div className="column is-12-mobile is-9">
      <div className="columns is-flex">
        <div className="column is-8-mobile is-8 control-filters__container">
          <span className="control-filters--label">Filter by:</span>
          <div className="control-filters--buttons">
            <Select defaultValue={sortBy.type} onChange={filterByType}>
              <Option value="timestamp">Date</Option>
              <Option value="title">Title</Option>
              <Option value="author">Author</Option>
              <Option value="voteScore">Votes</Option>
              <Option value="commentCount">Comments</Option>
            </Select>
            <Select defaultValue={sortBy.order} onChange={filterByOrder}>
              <Option value="decrescent">Decrescent</Option>
              <Option value="crescent">Crescent</Option>
            </Select>
          </div>
        </div>
        <div className="column is-4-mobile is-4 control-filters__container">
          <span className="control-filters--label">Layout:</span>
          <div className="control-filters--layout">
            <a onClick={() => handleAppLayout('normal')} className={`control-filters--layout-button${normalLayout}`}>
              <FontAwesomeIcon icon={faBars} />
            </a>
            <a onClick={() => handleAppLayout('box')} className={`control-filters--layout-button${boxLayout}`}>
              <FontAwesomeIcon icon={faThLarge} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isBoxLayout: getLayoutValue(state),
});

const mapDispatchToProps = dispatch => ({
  handleAppLayout: (layout) => {
    dispatch(setAppLayout(layout));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlsLeft);
