export const setToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');

export const isAuthenticated = () => !!getToken();

export const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  return !decoded?.exp || decoded.exp < Date.now() / 1000;
};
