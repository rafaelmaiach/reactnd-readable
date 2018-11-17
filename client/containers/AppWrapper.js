import React, { PureComponent, Fragment } from 'react';

import Footer from 'Components/footer/Footer';
import Header from 'Components/header/Header';
import NewPost from 'Components/post/NewPost';
import PostsImage from 'Components/posts/PostsImage';
import Posts from './Posts';

/**
 * @class AppWrapper
 * @description It's a wrapper to application to centralize the components
 */
class AppWrapper extends PureComponent {
  state = {
    isPostFormOpen: false,
  }

  /**
   * @method AppWrapper#openPost
   * @description Open the new post form to create a post
   */
  toggleNewPost = () => this.setState(prevState => ({ isPostFormOpen: !prevState.isPostFormOpen }));

  render() {
    const { isPostFormOpen } = this.state;

    return (
      <Fragment>
        <Header {...this.props} />
        <PostsImage />
        <NewPost isPostFormOpen={isPostFormOpen} closeForm={this.toggleNewPost} />
        <Posts {...this.props} openPost={this.toggleNewPost} />
        <Footer />
      </Fragment>
    );
  }
}

export default AppWrapper;
