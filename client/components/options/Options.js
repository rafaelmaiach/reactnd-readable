import React from 'react';

import {
  Modal, Dropdown, Menu, Icon, message,
} from 'antd';

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

const createShareMenu = (url) => {
  const handleCopyToClipboard = () => {
    copyToClipboard(url);

    message.success(
      <span className="notification is-success">
          Link copied to clipboard
      </span>
    );
  };

  const ShareItem = createMenuItem(optionsData.menu.share);

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

  return (
    <SubMenu title={ShareItem}>
      <Item>{FacebookItem}</Item>
      <Item>{TwitterItem}</Item>
      <Item>{ClipboardItem}</Item>
    </SubMenu>
  );
};

const Options = (props) => {
  const {
    id, onEdit, onDelete, deleteModalTitle, url, shareOption,
  } = props;

  const showConfirm = () => {
    confirm({
      title: deleteModalTitle,
      content: 'Are you sure to delete it?',
      onOk() {
        onDelete(id);

        message.success(
          <span className="notification is-success">
            Deleted with success!
          </span>
        );
      },
    });
  };

  const EditItem = createMenuItem({
    ...optionsData.menu.edit,
    onClick: onEdit,
  });

  const DeleteItem = createMenuItem({
    ...optionsData.menu.delete,
    onClick: showConfirm,
  });

  const shareMenu = shareOption && createShareMenu(url);

  const menu = (
    <Menu>
      <Item>{EditItem}</Item>
      {shareMenu}
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

export default Options;
