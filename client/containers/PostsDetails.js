import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { receiveDetails } from 'Actions/posts';

import { postSelector } from 'Selectors/posts';

import Header from 'Components/header/Header';
import Post from 'Components/post/Post';
import PostNotFound from 'Components/posts/PostNotFound';
import CommentsContainer from 'Components/comments/CommentsContainer';
import NewComment from 'Components/comments/NewComment';

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

    const commentsCount = post && post.commentCount;

    return (
      <Fragment>
        <Header {...this.props} />
        <div className="container is-fluid">
          {
            post ? (
              <section className="section">
                <div className="columns is-centered">
                  <Post isPostDetailsPage {...post} />
                </div>
                <CommentsContainer commentsCount={commentsCount} postId={post.id} />
                <NewComment parentId={post.id} />
              </section>
            ) : <PostNotFound isDetailsPage />
          }
        </div>
      </Fragment>
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
