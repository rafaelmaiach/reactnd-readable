import React from 'react';
import { connect } from 'react-redux';

import {
  Modal, Dropdown, Menu, Icon, message,
} from 'antd';

import { handleDeleteComment } from 'Actions/comments';

import optionsData from './OptionsData';

const { confirm } = Modal;
const { Item } = Menu;

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
    id, toggleEdition, deleteComment,
  } = props;

  const showConfirm = () => {
    confirm({
      title: 'Delete comment',
      content: 'Are you sure to delete this comment?',
      onOk() {
        deleteComment(id);

        message.success(
          <span className="notification is-success">
            Comment deleted!
          </span>
        );
      },
    });
  };

  const EditItem = createMenuItem({
    ...optionsData.menu.edit,
    onClick: toggleEdition,
  });

  const DeleteItem = createMenuItem({
    ...optionsData.menu.delete,
    onClick: showConfirm,
  });

  const menu = (
    <Menu>
      <Item>{EditItem}</Item>
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
  deleteComment: (commentId) => {
    dispatch(handleDeleteComment(commentId));
  },
});

export default connect(null, mapDispatchToProps)(Options);
