import React from 'react';
import { connect } from 'react-redux';

import { handleInitialData } from '../actions/shared';

import { fetchAllCategories, fetchCategoryPosts } from './fetchCategories';
import {
  fetchAllPosts,
  fetchPostDetails,
  fetchPostComments,
  fetchEditVoteForPost,
  fetchAddPost,
  fetchEditPost,
  fetchDeletePost,
} from './fetchPosts';
import {
  fetchCommentDetails,
  fetchEditVoteForComment,
  fetchAddComment,
  fetchEditComment,
  fetchDeleteComment,
} from './fetchComments';

import Categories from '../components/Categories';
import Posts from '../components/Posts';

const Readable = ({ dispatch }) => {
  const fetchSim = [
    /* ----- CATEGORIES ----- */
    { t: 'GET ALL CATEGORIES', f: fetchAllCategories },
    { t: 'GET CATEGORIES POSTS', f: fetchCategoryPosts },
    /* ----- POSTS ----- */
    { t: 'GET ALL POSTS', f: fetchAllPosts },
    { t: 'GET POST DETAILS', f: fetchPostDetails },
    { t: 'GET POST COMMENTS', f: fetchPostComments },
    { t: 'EDIT POST VOTE', f: fetchEditVoteForPost },
    { t: 'ADD NEW POST', f: fetchAddPost },
    { t: 'EDIT POST DETAILS', f: fetchEditPost },
    { t: 'DELETE POST', f: fetchDeletePost },
    /* ----- COMMENTS ----- */
    { t: 'GET COMMENT DETAILS', f: fetchCommentDetails },
    { t: 'EDIT COMMENT VOTE', f: fetchEditVoteForComment },
    { t: 'ADD NEW COMMENT', f: fetchAddComment },
    { t: 'EDIT COMMENT DETAILS', f: fetchEditComment },
    { t: 'DELETE COMMENT', f: fetchDeleteComment },
  ];

  dispatch(handleInitialData());

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {fetchSim.map(f => <button key={f.t} type="button" onClick={f.f}>{f.t}</button>)}
      </div>
      <Categories />
      <Posts />
    </div>
  );
};

export default connect()(Readable);
