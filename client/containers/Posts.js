import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Spin } from 'antd';

import { postsValuesSelector } from 'Selectors/posts';
import { getLayoutValue } from 'Selectors/layout';

import { receiveAllPosts, receivePostsByCategory } from 'Actions/posts';
import { setAppLayout } from 'Actions/layout.creator';

import Controls from 'Components/controls/Controls';

import Post from 'Components/post/Post';
import PostNotFound from 'Components/posts/PostNotFound';

class Posts extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({
      author: PropTypes.string,
      body: PropTypes.string,
      category: PropTypes.string,
      commentCount: PropTypes.number,
      deleted: PropTypes.bool,
      id: PropTypes.string,
      timestamp: PropTypes.number,
      title: PropTypes.string,
      voteScore: PropTypes.number,
    })),
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
    isBoxLayout: PropTypes.bool,
  }

  static defaultProps = {
    posts: null,
    isBoxLayout: false,
  }

  state = {
    sortBy: {
      type: 'timestamp',
      order: 'decrescent',
    },
  }

  componentDidMount() {
    const { handleAppLayout } = this.props;
    this.getPosts();
    handleAppLayout('normal');
  }

  componentDidUpdate(prevProps, prevState) {
    const { params: { category: prevCategory } } = prevProps.match;
    const { sortBy: prevSortBy } = prevState;

    const { match: { params: { category } } } = this.props;
    const { sortBy } = this.state;

    const categoriesChanged = prevCategory !== category;
    const sortChanged = prevSortBy !== sortBy;

    if (categoriesChanged || sortChanged) {
      this.getPosts();
    }
  }

  getPosts = () => {
    const { sortBy } = this.state;
    const {
      match: { params: { category } },
      getPostsByCategory,
      getAllPosts,
    } = this.props;

    if (category) {
      getPostsByCategory(category, sortBy);
      return;
    }

    getAllPosts(sortBy);
  }

  createPosts = (posts) => {
    const { match: { params: { category } }, isBoxLayout } = this.props;

    return posts
      // Filter the categories to show only those that match with category or show all if category isn't selected
      .filter(post => category ? post.category === category : true)
      .map(post => <Post isBoxLayout={isBoxLayout} key={post.id} {...post} />);
  }

  handleSort = sortBy => this.setState(() => ({ sortBy }));

  render() {
    const { sortBy } = this.state;
    const {
      posts, isBoxLayout, openPost, isLoading,
    } = this.props;

    const invalidPosts = (!posts || posts.length === 0);

    const postList = invalidPosts ? <PostNotFound /> : this.createPosts(posts);

    const postsLayout = isBoxLayout ? 'posts-box-layout' : '';

    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns is-multiline is-centered">
            <Controls
              sortBy={sortBy}
              handleSort={this.handleSort}
              onClick={openPost}
            />
            <div className="column is-12">
              <div className={`columns is-multiline is-centered ${postsLayout}`}>
                {isLoading ? <Spin size="large" /> : postList}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  posts: postsValuesSelector(state),
  isBoxLayout: getLayoutValue(state),
  isLoading: state.loading,
});

const mapDispatchToProps = dispatch => ({
  getPostsByCategory: (category, sortBy) => {
    dispatch(receivePostsByCategory(category, sortBy));
  },
  getAllPosts: (sortBy) => {
    dispatch(receiveAllPosts(sortBy));
  },
  handleAppLayout: (layout) => {
    dispatch(setAppLayout(layout));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
