import React from 'react';

import { Icon } from 'antd';

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

/**
 * <div className="content has-text-centered">
      <p>
        <strong>Bulma</strong>
      by
        <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
      </p>
    </div>
 */
