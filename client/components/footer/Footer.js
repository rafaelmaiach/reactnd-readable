import React from 'react';

import { Icon } from 'antd';

/**
 * @constructor Footer
 * @description Creates the application footer
 */
const Footer = () => (
  <footer className="footer">
    <div className="columns is-multiline footer__container">
      <div className="column is-12 has-text-centered footer__container--top">
        <span className="footer-text">OMAIA BLOG</span>
        <span className="footer-text">by</span>
        <span className="footer-text">
          <a href="https://www.linkedin.com/in/rafaelmaiach/" target="_blank" rel="noopener noreferrer">
            Rafael Maia Chieregatto
          </a>
        </span>
      </div>
      <div className="column is-12 has-text-centered footer__container--bottom">
        <span className="footer-text">FOLLOW ME: </span>
        <a href="http://github.com/rafaelmaiach" target="_blank" rel="noopener noreferrer">
          <Icon type="github" />
        </a>
        <a href="https://www.linkedin.com/in/rafaelmaiach/" target="_blank" rel="noopener noreferrer">
          <Icon type="linkedin" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
