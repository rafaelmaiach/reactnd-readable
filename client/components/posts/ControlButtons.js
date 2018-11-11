import React from 'react';

const ControlButtons = (props) => {
  const { onClick } = props;

  return (
    <div className="column is-12">
      <div className="columns is-centered">
        <div className="column is-7">
          <div className="columns">
            <div className="column is-6 has-text-centered">Filter buttons</div>
            <div className="column is-6 has-text-centered">
              <a role="button" className="button is-link" onClick={onClick}>New Post</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlButtons;
