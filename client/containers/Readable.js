import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleInitialData } from 'Actions/shared';

import Posts from './Posts';
import Categories from './Categories';

class Readable extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Categories />
          <Posts />
        </div>
      </div>
    );
  }
}

export default connect()(Readable);
