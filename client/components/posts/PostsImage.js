import React from 'react';

/**
 * @constructor PostsImage
 * @description Renders the application image logo (OMAIA BLOG)
 */
const PostsImage = () => (
  <div className="posts-image">
    <div className="overlay-image">
      <div className="overlay-image--text">
        <span className="title is-size-4-mobile is-size-1 posts-image--title">
          OMAIA BLOG
        </span>
        <span className="title is-size-7-mobile is-size-4 posts-image--text">
          Bringing information and knowledge to you
        </span>
      </div>
    </div>
  </div>
);

export default PostsImage;
