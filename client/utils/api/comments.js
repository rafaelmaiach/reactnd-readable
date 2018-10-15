import { getHeaders, getApiUrl } from './helpers';

const getCommentDetails = (commentId) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/comments/${commentId}`, { headers })
    .then(res => res.json())
    .then(data => data);
};

const editVoteForComment = (commentId, option) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(option),
  }).then(res => res.json());
};

const addComment = (comment) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  }).then(res => res.json());
};

const editComment = (commentId, details) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  }).then(res => res.json());
};

const deleteComment = (commentId) => {
  const headers = getHeaders();
  const api = getApiUrl();

  return fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
    },
  }).then(res => res.json());
};

export {
  getCommentDetails,
  editVoteForComment,
  addComment,
  editComment,
  deleteComment,
};
