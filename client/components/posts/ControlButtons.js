import React from 'react';

const ControlButtons = (props) => {
  const { onClick } = props;

  return (
    <div className="column is-12">
      <div className="columns is-centered">
        <div className="column is-7">
          <div className="columns">
            <div className="column is-6">Filter buttons</div>
            <div className="column is-6">
              <button className="button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlButtons;
