import React from 'react';

import {
  Popconfirm, Dropdown, Menu, Icon, message,
} from 'antd';

import { copyToClipboard } from 'Utils/common.helpers';

const Options = (props) => {
  const {
    id, category, onConfirm, onCancel, toggleEdition,
  } = props;


  const handleCopyToClipboard = () => {
    const { origin } = window.location;
    const url = `${origin}/${category}/${id}`;

    copyToClipboard(url);

    message.success(
      <span className="notification is-success">
        Link to post copied to clipboard
      </span>
    );
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a className="post-options-item" onClick={toggleEdition}>
          <Icon type="form" />
          <span> Edit</span>
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a className="post-options-item" onClick={handleCopyToClipboard}>
          <Icon type="share-alt" />
          <span> Share</span>
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm title="Are you sure delete this post?" onConfirm={onConfirm} okText="Yes" cancelText="No">
          <a className="post-options-item">
            <Icon type="delete" />
            <span> Delete</span>
          </a>
        </Popconfirm>
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
