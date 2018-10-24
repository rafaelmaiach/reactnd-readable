import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { receivePostsByCategory, handleAddPost } from 'Actions/posts';
import Post from 'Components/Post';

class Posts extends Component {
  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props;
    if (prevProps.match && match) {
      const { category: prevCategory } = prevProps.match;
      const { category: currentCategory } = match;

      if (prevCategory !== currentCategory) {
        this.getPosts();
      }
    }
  }

  getPosts = () => {
    const { match, dispatch } = this.props;

    if (match) {
      const { category } = match.params;
      dispatch(receivePostsByCategory(category));
    }
  }

  createPost = () => {
    const post = {
      id: uuid(),
      timestamp: Date.now(),
      title: 'A new post',
      body: 'A new post body',
      author: 'A new post author',
      category: 'react',
    };

    const { dispatch } = this.props;
    dispatch(handleAddPost(post));
  }

  render() {
    const { posts } = this.props;
    const postList = posts.map(post => <Post key={post.id} {...post} />);

    return (
      <div>
        <button type="button" onClick={this.createPost}>ADD POST</button>
        <h1>POSTS</h1>
        {postList}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: Object.values(posts),
});

export default connect(mapStateToProps)(Posts);
