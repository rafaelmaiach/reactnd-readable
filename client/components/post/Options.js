import React from 'react';

import {
  Popconfirm, Dropdown, Menu, Icon,
} from 'antd';

const Options = ({ onConfirm, onCancel, toggleEdition }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a className="post-options-item" onClick={toggleEdition}>
          <Icon type="form" />
          <span> Edit</span>
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <Popconfirm title="Are you sure delete this post?" onConfirm={onConfirm} onCancel={onCancel} okText="Yes" cancelText="No">
          <p className="post-options-item">
            <Icon type="delete" />
            <span> Delete</span>
          </p>
        </Popconfirm>
      </Menu.Item>
      <Menu.Item key="3">
        <p className="post-options-item">
          <Icon type="share-alt" />
          <span> Share</span>
        </p>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" href="#">
        <Icon type="ellipsis" style={{ fontSize: '2rem' }} />
      </a>
    </Dropdown>
  );
};

export default Options;
