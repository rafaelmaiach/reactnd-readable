import React, { Component } from 'react';
import { connect } from 'react-redux';

import { receivePostsByCategory } from 'Actions/posts';
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

  render() {
    const { posts } = this.props;
    const postList = posts.map(post => <Post key={post.id} {...post} />);

    return (
      <div>
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
