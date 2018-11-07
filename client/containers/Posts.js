import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { receiveAllPosts, receivePostsByCategory, handleAddPost } from 'Actions/posts';
import Post from 'Components/posts/Post';
import NewPost from 'Components/posts/NewPost';

class Posts extends Component {
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
    const { match: { params }, getPostsByCategory, getAllPosts } = this.props;
    const { category } = params;

    if (category) {
      getPostsByCategory(category);
      return;
    }

    getAllPosts();
  }

  toggleNewPost = () => {
    this.setState(prevState => ({ isNewPost: !prevState.isNewPost }));
  }

  render() {
    const { isNewPost } = this.state;
    const { posts } = this.props;

    const postList = posts.map(post => <Post key={post.id} {...post} />);

    const faIcon = isNewPost ? faTimesCircle : faPlusCircle;

    return (
      <section className="section">
        <div className="container is-fluid">
          <div className="columns is-multiline">
            <div className="column is-1 is-offset-5">
              <FontAwesomeIcon icon={faIcon} size="4x" onClick={this.toggleNewPost} />
            </div>
            <div className="column is-12">
              <div className="columns is-multiline">
                {isNewPost && <NewPost toggleNewPost={this.toggleNewPost} />}
                {postList}
              </div>
            </div>
          </div>
          {/* <button type="button" onClick={this.createPost}>ADD POST</button> */}

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
  addPost: (post) => {
    dispatch(handleAddPost(post));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
