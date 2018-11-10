import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { receiveAllPosts, receivePostsByCategory } from 'Actions/posts';
import Post from 'Components/posts/Post';
import NewPost from 'Components/posts/NewPost';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
    })).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        category: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    isNewPost: false,
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    const { params: { category: prevCategory } } = prevProps.match;
    const { match: { params: { category } } } = this.props;

    if (prevCategory !== category) {
      this.getPosts();
    }
  }

  getPosts = () => {
    const { match: { params: { category } }, getPostsByCategory, getAllPosts } = this.props;

    if (category) {
      getPostsByCategory(category);
      return;
    }

    getAllPosts();
  }

  toggleNewPost = () => {
    this.setState(prevState => ({ isNewPost: !prevState.isNewPost }));
  }

  createPosts = (posts) => {
    const { match: { params: { category } } } = this.props;

    return posts
    // Filter the categories to show only those that match with category or show all if category isn't selected
      .filter(post => category ? post.category === category : true)
      .map(post => <Post key={post.id} {...post} />);
  }

  render() {
    const { isNewPost } = this.state;
    const { posts } = this.props;

    const postList = this.createPosts(posts);

    const faIcon = isNewPost ? faTimesCircle : faPlusCircle;

    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns is-multiline is-centered">
            <div className="column is-12">
              <div className="columns is-multiline is-centered">
                <div className="column is-12">
                  <FontAwesomeIcon icon={faIcon} size="4x" onClick={this.toggleNewPost} />
                </div>
                <div className="column is-12">
                  {isNewPost && <NewPost toggleNewPost={this.toggleNewPost} />}
                </div>
              </div>
            </div>
            <div className="column is-12">
              <div className="columns is-multiline is-centered">
                {postList}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: Object.values(posts),
});

const mapDispatchToProps = dispatch => ({
  getPostsByCategory: (category) => {
    dispatch(receivePostsByCategory(category));
  },
  getAllPosts: () => {
    dispatch(receiveAllPosts());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
