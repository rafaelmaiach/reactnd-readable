import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { receivePostsByCategory, handleAddPost } from 'Actions/posts';
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
                {isNewPost && <NewPost />}
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

export default connect(mapStateToProps)(Posts);
