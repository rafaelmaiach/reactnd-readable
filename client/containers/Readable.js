import React from 'react';

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

const Readable = () => {
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
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {fetchSim.map(f => <button key={f.t} type="button" onClick={f.f}>{f.t}</button>)}
    </div>
  );
};

export default Readable;
