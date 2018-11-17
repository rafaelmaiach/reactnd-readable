import React, { memo } from 'react';

import {
  Modal, Dropdown, Menu, Icon, message,
} from 'antd';

import { createShareMenu } from 'Utils/cardOptions.helpers';
import OptionsMenuItem from './OptionsMenuItem';

import optionsData from './OptionsData';

const { confirm } = Modal;
const { Item } = Menu;

/**
 * @constructor Options
 * @param {object} props - Options props
 * @description Create the dropdown menu to handle edition, delete and share options for each card
 */
const Options = (props) => {
  const {
    id, onEdit, onDelete, deleteModalTitle, url, shareOption,
  } = props;

  /**
   * @function showConfirm
   * @description show the confirmation message when deleting a card
   */
  const showConfirm = () => {
    confirm({
      title: deleteModalTitle,
      content: 'Are you sure to delete it?',
      onOk() {
        onDelete(id);

        message.success(
          <span className="notification is-success">
            Deleted with success!
          </span>, 3
        );
      },
    });
  };

  const editProps = {
    ...optionsData.menu.edit,
    onClick: onEdit,
  };

  const deleteProps = {
    ...optionsData.menu.delete,
    onClick: showConfirm,
  };

  const EditItem = <OptionsMenuItem {...editProps} />;

  const DeleteItem = <OptionsMenuItem {...deleteProps} />;

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

// Don't need to re-render the options button
export default memo(Options, () => true);
