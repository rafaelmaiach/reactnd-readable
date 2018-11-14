import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { receiveDetails } from 'Actions/posts';

import { postSelector } from 'Selectors/posts'; // eslint-disable-line

import Header from 'Components/header/Header';
import Post from 'Components/post/Post';
import PostNotFound from 'Components/posts/PostNotFound';

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
          post ? (
            <section className="section">
              <div className="columns is-centered">
                <Post isPostDetailsPage {...post} />
              </div>
            </section>
          ) : <PostNotFound isDetailsPage />
        }
      </div>

    );
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { id } } } = props;

  return {
    post: postSelector(state, id),
  };
};

const mapDispatchToProps = dispatch => ({
  getPostDetails: (postId) => {
    dispatch(receiveDetails(postId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
