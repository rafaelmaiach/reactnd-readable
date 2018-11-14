import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThLarge } from '@fortawesome/free-solid-svg-icons';

import { Select } from 'antd';
const { Option } = Select;

const ControlsLeft = (props) => {
  const {
    sortBy, handleSort, setBoxLayout, setNormalLayout, isBoxLayout,
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
            <a onClick={setNormalLayout} className={`control-filters--layout-button${normalLayout}`}>
              <FontAwesomeIcon icon={faBars} />
            </a>
            <a onClick={setBoxLayout} className={`control-filters--layout-button${boxLayout}`}>
              <FontAwesomeIcon icon={faThLarge} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlsLeft;
