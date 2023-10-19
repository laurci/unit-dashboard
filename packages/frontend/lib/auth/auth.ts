function createAuth() {
  let authToken = localStorage.getItem('auth.token');

  const setToken = (token: string) => {
    localStorage.setItem('auth.token', token);
    authToken = token;
  };

  const getToken = () => authToken;

  return {
    setToken,
    getToken,
  };
}

export const auth = createAuth();
