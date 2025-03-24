const API_BASE = 'http://localhost:8000/api';

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

export const createPost = async (postData, token) => {
  const response = await fetch(`${API_BASE}/posts/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    },
    body: JSON.stringify(postData)
  });
  return response.json();
};

export const getFeed = async (token) => {
  const response = await fetch(`${API_BASE}/feed/`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    }
  });
  return response.json();
};