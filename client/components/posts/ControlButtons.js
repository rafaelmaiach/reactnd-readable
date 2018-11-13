import React from 'react';
import PropTypes from 'prop-types';

import { Select, Icon } from 'antd';
const { Option } = Select;

const ControlButtons = (props) => {
  const { sortBy, handleSort, onClick } = props;

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

  return (
    <div className="column is-12">
      <div className="columns is-centered">
        <div className="column is-7">
          <div className="columns is-flex">
            <div className="column is-8-mobile is-9 control-filters__container">
              <span className="control-filters--label">Filter by:</span>
              <div className="control-filters--buttons">
                <Select defaultValue={sortBy.type} style={{ width: '8rem' }} onChange={filterByType}>
                  <Option value="timestamp">Date</Option>
                  <Option value="title">Title</Option>
                  <Option value="author">Author</Option>
                  <Option value="category">Category</Option>
                  <Option value="voteScore">Votes</Option>
                  <Option value="commentCount">Comments</Option>
                </Select>
                <Select defaultValue={sortBy.order} style={{ width: '8rem' }} onChange={filterByOrder}>
                  <Option value="decrescent">Decrescent</Option>
                  <Option value="crescent">Crescent</Option>
                </Select>
              </div>
            </div>
            <div className="column is-4-mobile is-3 control-new-post">
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

ControlButtons.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ControlButtons;
