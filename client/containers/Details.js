import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { receiveDetails } from 'Actions/posts';

import Header from 'Components/header/Header';
import Post from 'Components/posts/Post';

class Details extends Component {
  componentDidMount() {
    const {
      getPostDetails,
      match: { params: { id } },
    } = this.props;
    getPostDetails(id);
  }

  render() {
    const { post } = this.props;

    return (
      <div className="container is-fluid">
        <Header {...this.props} />
        {
          post && (
            <section className="section">
              <div className="columns is-centered">
                <Post {...post} />
              </div>
            </section>
          )
        }
      </div>

    );
  }
}

const mapStateToProps = ({ posts }, props) => {
  const { match: { params: { id } } } = props;

  if (posts.error) {
    return {
      post: null,
    };
  }

  return {
    post: posts[id],
  };
};

const mapDispatchToProps = dispatch => ({
  getPostDetails: (postId) => {
    dispatch(receiveDetails(postId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
