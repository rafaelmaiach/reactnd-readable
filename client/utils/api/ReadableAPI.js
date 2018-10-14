/* eslint-disable */
const api = 'https://reactnd-books-api.udacity.com';


// Generate a unique token for storing your bookshelf data on the backend server.
// let token = localStorage.token;
// if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const getHeaders = () => ({
  Accept: 'application/json',
  Authorization: localStorage.token,
});

export const get = bookId => {
  const headers = getHeaders();

  return fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);
};

export const getAll = () => {
  const headers = getHeaders();

  return fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);
};

export const update = (book, shelf) => {
  const headers = getHeaders();

  return fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ shelf }),
  }).then(res => res.json());
};

export const search = query => {
  const headers = getHeaders();

  return fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then(res => res.json())
    .then(data => data.books);
};
