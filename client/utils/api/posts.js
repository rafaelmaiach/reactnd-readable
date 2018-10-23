import { getHeaders, getApiUrl } from './helpers';

const getAllPosts = () => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);
};

const getPostsByCategory = (category) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);
};

const getPostDetails = (postId) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data);
};

const getPostComments = (postId) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);
};

const editVoteForPost = (postId, option) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(option),
  }).then(res => res.json());
};

const addPost = (post) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  }).then(res => res.json());
};

const editPost = (postId, details) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then(res => res.json());
};

const deletePost = (postId) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  }).then(res => res.json());
};

export {
  getAllPosts,
  getPostsByCategory,
  getPostDetails,
  getPostComments,
  editVoteForPost,
  addPost,
  editPost,
  deletePost,
};
