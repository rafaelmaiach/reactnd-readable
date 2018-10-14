// Generate a unique token for storing your bookshelf data on the backend server.
const generateToken = () => {
  let token = localStorage.getItem('token');
  if (!token) {
    token = Math.random().toString(36).substr(-8);
    localStorage.setItem('token', token);
  }

  return token;
};

const getHeaders = () => ({
  Authorization: generateToken(),
});

const getApiUrl = () => 'http://localhost:3001';

export {
  getHeaders,
  getApiUrl,
};
