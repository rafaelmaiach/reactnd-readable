import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { receiveDetails } from 'Actions/posts';

import Header from 'Components/header/Header';

class Details extends Component {
  componentDidMount() {
    const {
      getPostDetails,
      match: { params: { id } },
    } = this.props;
    getPostDetails(id);
  }

  render() {
    return (
      <div className="container is-fluid">
        <Header {...this.props} />
        <section className="section">
          Oi
        </section>
      </div>

    );
  }
}

const mapStateToProps = ({ details }) => ({
  details,
});

const mapDispatchToProps = dispatch => ({
  getPostDetails: (postId) => {
    dispatch(receiveDetails(postId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
