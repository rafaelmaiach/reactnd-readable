import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import NewPost from 'Components/post/NewPost';
// import Vote from 'Components/vote/Vote';
import CommentHeader from './CommentHeader';

class Comment extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
  };

  state = {
    // isEdition: false,
  }

  toggleEdition = () => this.setState(({ isEdition }) => ({ isEdition: !isEdition }));

  render() {
    // const { isEdition } = this.state;
    const {
      // id,
      // author,
      body,
      // voteScore,
    } = this.props;

    return (
      // isEdition
      //   ? (
      //     {<NewPost
      //       isBoxLayout={isBoxLayout}
      //       isEdition={isEdition}
      //       closeForm={this.toggleEdition}
      //       postInfo={postInfo}
      //     />}
      //   )
      //   : (
      <div className="column is-12-mobile is-8">
        <div className="box post-box comment-box is-paddingless">
          <article className="media">
            <div className="media-content">
              <div className="content">
                <div className="media-content">
                  <CommentHeader
                    {...this.props}
                    toggleEdition={this.toggleEdition}
                    onConfirm={this.onConfirm}
                  />
                  <p className="post-description is-size-7-mobile is-size-6">
                    {body}
                  </p>
                </div>
              </div>
              <br />
              <nav className="level is-mobile">
                {/* <Vote postId={id} score={voteScore} /> */}
              </nav>
            </div>
          </article>
        </div>
      </div>
    );
  }
}

export default Comment;
