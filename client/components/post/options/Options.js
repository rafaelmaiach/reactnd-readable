import React from 'react';
import { connect } from 'react-redux';

import {
  Modal, Dropdown, Menu, Icon, message,
} from 'antd';

import { handleDeletePost } from 'Actions/posts';

import { copyToClipboard } from 'Utils/common.helpers';

import optionsData from './OptionsData';

const { confirm } = Modal;
const { Item, SubMenu } = Menu;

const createMenuItem = (params) => {
  const {
    iconOptions, onClick = null, label, customLabel = null,
  } = params;

  if (customLabel) {
    return (
      <span className="post-options-item">
        <Icon {...iconOptions} />
        <a className="post-share-item" href={customLabel} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </span>
    );
  }

  return (
    <a className="post-options-item" onClick={onClick}>
      <Icon {...iconOptions} />
      <span>{` ${label}`}</span>
    </a>
  );
};

const Options = (props) => {
  const {
    id, title, category, toggleEdition, deletePost,
  } = props;

  const { origin } = window.location;
  const url = `${origin}/${category}/${id}`;

  const handleCopyToClipboard = () => {
    copyToClipboard(url);

    message.success(
      <span className="notification is-success">
        Link to post copied to clipboard
      </span>
    );
  };

  const showConfirm = () => {
    confirm({
      title,
      content: 'Are you sure to delete this post?',
      onOk() {
        deletePost(id);

        message.success(
          <span className="notification is-success">
            Post deleted!
          </span>
        );
      },
    });
  };

  const EditItem = createMenuItem({
    ...optionsData.menu.edit,
    onClick: toggleEdition,
  });

  const ShareItem = createMenuItem(optionsData.menu.share);

  const DeleteItem = createMenuItem({
    ...optionsData.menu.delete,
    onClick: showConfirm,
  });

  const FacebookItem = createMenuItem({
    ...optionsData.submenu.facebook,
    customLabel: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  });

  const TwitterItem = createMenuItem({
    ...optionsData.submenu.twitter,
    customLabel: `https://twitter.com/home?status=${url}`,
  });

  const ClipboardItem = createMenuItem({
    ...optionsData.submenu.clipboard,
    onClick: handleCopyToClipboard,
  });

  const menu = (
    <Menu>
      <Item>{EditItem}</Item>
      <SubMenu title={ShareItem}>
        <Item>{FacebookItem}</Item>
        <Item>{TwitterItem}</Item>
        <Item>{ClipboardItem}</Item>
      </SubMenu>
      <Item>{DeleteItem}</Item>
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

const mapDispatchToProps = dispatch => ({
  deletePost: (postId) => {
    dispatch(handleDeletePost(postId));
  },
});

export default connect(null, mapDispatchToProps)(Options);
