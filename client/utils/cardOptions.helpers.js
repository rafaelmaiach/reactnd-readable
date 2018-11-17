import React from 'react';
import PropTypes from 'prop-types';

import { Menu, message } from 'antd';

import { copyToClipboard } from 'Utils/common.helpers';

import optionsData from 'Components/options/OptionsData';

import OptionsMenuItem from 'Components/options/OptionsMenuItem';

const { Item, SubMenu } = Menu;

/**
 * @constructor createShareMenu
 * @param {string} url - Url to share
 * @description Create the menu items for share submenu
 */
const createShareMenu = (url) => {
  // Create a wrapper on copyToClipboard to show success message
  const handleCopyToClipboard = () => {
    copyToClipboard(url);

    message.success(
      <span className="notification is-success">
          Link copied to clipboard
      </span>
    );
  };

  const ShareItem = <OptionsMenuItem {...optionsData.menu.share} />;

  const { facebook, twitter, clipboard } = optionsData.submenu;

  const facebookItemProps = {
    ...facebook,
    customLabel: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  };

  const FacebookItem = <OptionsMenuItem {...facebookItemProps} />;

  const twitterItemProps = {
    ...twitter,
    customLabel: `https://twitter.com/home?status=${url}`,
  };
  const TwitterItem = <OptionsMenuItem {...twitterItemProps} />;

  const clipboardItemProps = {
    ...clipboard,
    onClick: handleCopyToClipboard,
  };

  const ClipboardItem = <OptionsMenuItem {...clipboardItemProps} />;

  return (
    <SubMenu title={ShareItem}>
      <Item>{FacebookItem}</Item>
      <Item>{TwitterItem}</Item>
      <Item>{ClipboardItem}</Item>
    </SubMenu>
  );
};

createShareMenu.propTypes = {
  url: PropTypes.string.isRequired,
};

export {
  createShareMenu,
};
