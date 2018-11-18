import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
const { Option } = Select;

const ControlsFilter = (props) => {
  const { sortBy, handleSort } = props;

  /**
   * @function filterByType
   * @param {string} type - sort type
   * @description dispatch to change filter type
   */
  const filterByType = (type) => {
    const { order } = sortBy;
    handleSort({
      type,
      order,
    });
  };

  /**
   * @function filterByOrder
   * @param {string} order - sort order
   * @description dispatch to change filter order
   */
  const filterByOrder = (order) => {
    const { type } = sortBy;
    handleSort({
      type,
      order,
    });
  };

  return (
    <div className="column is-8-mobile is-8 control-filters__container">
      <span className="control-filters--label">Sort by:</span>
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
  );
};

ControlsFilter.propTypes = {
  sortBy: PropTypes.shape({
    type: PropTypes.string,
    order: PropTypes.string,
  }).isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default ControlsFilter;
