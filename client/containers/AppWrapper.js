import React, { Component, Fragment } from 'react';

import Footer from 'Components/footer/Footer';
import Header from 'Components/header/Header';
import NewPost from 'Components/post/NewPost';
import PostsImage from 'Components/posts/PostsImage';
import Posts from './Posts';


class AppWrapper extends Component {
  state = {
    isPostFormOpen: false,
  }

  openPost = () => this.setState(() => ({ isPostFormOpen: true }));

  closeForm = () => this.setState(() => ({ isPostFormOpen: false }));

  toggleNewPost = () => this.setState(prevState => ({ isPostFormOpen: !prevState.isPostFormOpen }));

  render() {
    const { isPostFormOpen } = this.state;

    return (
      <Fragment>
        <Header {...this.props} />
        <PostsImage />
        <NewPost isPostFormOpen={isPostFormOpen} closeForm={this.closeForm} />
        <Posts {...this.props} openPost={this.openPost} />
        <Footer />
      </Fragment>
    );
  }
}

export default AppWrapper;
