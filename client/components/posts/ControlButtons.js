import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThLarge } from '@fortawesome/free-solid-svg-icons';

import { Select } from 'antd';
const { Option } = Select;

const ControlButtons = (props) => {
  const {
    sortBy, handleSort, onClick, setBoxLayout, setNormalLayout, isBoxLayout,
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

  return (
    <div className="column is-12">
      <div className="columns is-centered">
        <div className="column is-8">
          <div className="columns is-flex">
            <div className="column is-8-mobile is-9 control-filters__container">
              <div className="control-filters--buttons">
                <Select defaultValue={sortBy.type} style={{ width: '8rem' }} onChange={filterByType}>
                  <Option value="timestamp">Date</Option>
                  <Option value="title">Title</Option>
                  <Option value="author">Author</Option>
                  <Option value="voteScore">Votes</Option>
                  <Option value="commentCount">Comments</Option>
                </Select>
                <Select defaultValue={sortBy.order} style={{ width: '8rem' }} onChange={filterByOrder}>
                  <Option value="decrescent">Decrescent</Option>
                  <Option value="crescent">Crescent</Option>
                </Select>
                <div className="control-filters--layout">
                  <a
                    onClick={setNormalLayout}
                    className={`control-filters--layout-button${!isBoxLayout ? '-active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </a>
                  <a
                    onClick={setBoxLayout}
                    className={`control-filters--layout-button${isBoxLayout ? '-active' : ''}`}
                  >
                    <FontAwesomeIcon icon={faThLarge} />
                  </a>
                </div>
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
