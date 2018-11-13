import React from 'react';

const PostNotFound = ({ isDetailsPage }) => (
  <section className="section">
    <div className="container is-full has-text-centered">
      <img src="/public/images/post-not-found.gif" alt="Post not found" />
      {
        !isDetailsPage
          ? (
            <div className="column">
              <p className="is-size-6-mobile is-size-5">WHERE ARE THE POSTS?</p>
              <p className="is-size-7-mobile is-size-6">SORRY, WE CANNOT FIND ANY</p>
              <p className="is-size-7-mobile is-size-6">CHECK THE CATEGORY OR CREATE A NEW ONE</p>
            </div>
          )
          : (
            <div className="column">
              <p className="is-size-6-mobile is-size-5">POST NOT FOUND</p>
              <p className="is-size-7-mobile is-size-6">IT WAS DELETED OR DOESN'T EXIST</p>
              <p className="is-size-7-mobile is-size-6">CHECK THE URL OR CREATE A NEW ONE</p>
            </div>
          )
      }
    </div>
  </section>
);

export default PostNotFound;
