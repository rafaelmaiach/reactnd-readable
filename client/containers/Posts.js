import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { receiveAllPosts, receivePostsByCategory } from 'Actions/posts';

import { postsValuesSelector } from 'Selectors/posts'; // eslint-disable-line

import Header from 'Components/header/Header';
import Post from 'Components/post/Post';
import NewPost from 'Components/post/NewPost';
import ControlButtons from 'Components/posts/ControlButtons';
import PostsImage from 'Components/posts/PostsImage';
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
  }

  static defaultProps = {
    posts: null,
  }

  state = {
    isPostFormOpen: false,
    sortBy: {
      type: 'timestamp',
      order: 'decrescent',
    },
    isBoxLayout: false,
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    const { params: { category: prevCategory } } = prevProps.match;
    const { sortBy: prevSortBy } = prevState;

    const { match: { params: { category } } } = this.props;
    const { sortBy } = this.state;

    const categoriesChanged = prevCategory !== category;
    const sortChanged = prevSortBy !== sortBy;

    if ((categoriesChanged) || (sortChanged)) {
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
    const { isBoxLayout } = this.state;
    const { match: { params: { category } } } = this.props;

    return posts
      // Filter the categories to show only those that match with category or show all if category isn't selected
      .filter(post => category ? post.category === category : true)
      .map(post => <Post isBoxLayout={isBoxLayout} key={post.id} {...post} />);
  }

  openPost = () => this.setState(() => ({ isPostFormOpen: true }));

  closeForm = () => this.setState(() => ({ isPostFormOpen: false }));

  toggleNewPost = () => this.setState(prevState => ({ isPostFormOpen: !prevState.isPostFormOpen }));

  handleSort = sortBy => this.setState(() => ({ sortBy }));

  setBoxLayout = () => this.setState(() => ({ isBoxLayout: true }));

  setNormalLayout = () => this.setState(() => ({ isBoxLayout: false }));

  render() {
    const { isPostFormOpen, sortBy, isBoxLayout } = this.state;
    const { posts } = this.props;

    const invalidPosts = (!posts || posts.length === 0);

    const postList = invalidPosts ? <PostNotFound /> : this.createPosts(posts);

    const postsLayout = isBoxLayout ? 'posts-box-layout' : '';

    return (
      <Fragment>
        <Header {...this.props} />
        <PostsImage />
        <NewPost isPostFormOpen={isPostFormOpen} closeForm={this.closeForm} />
        <section className="section">
          <div className="container is-fluid">
            <div className="columns is-multiline is-centered">
              <ControlButtons
                sortBy={sortBy}
                handleSort={this.handleSort}
                setBoxLayout={this.setBoxLayout}
                setNormalLayout={this.setNormalLayout}
                onClick={this.openPost}
                isBoxLayout={isBoxLayout}
              />
              <div className="column is-12">
                <div className={`columns is-multiline is-centered ${postsLayout}`}>
                  {postList}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  posts: postsValuesSelector(state),
});

const mapDispatchToProps = dispatch => ({
  getPostsByCategory: (category, sortBy) => {
    dispatch(receivePostsByCategory(category, sortBy));
  },
  getAllPosts: (sortBy) => {
    dispatch(receiveAllPosts(sortBy));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
