const TOKEN_KEY = "jwt-token";
const REFRESH_TOKEN_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id"


export function setTokens({ refreshToken, idToken, localId, expiresIn = 3600, registered }) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(TOKEN_KEY, idToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, expiresDate);
  localStorage.setItem(USERID_KEY, localId)
};

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY)
};

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
};

export function getTokenExpires() {
  return localStorage.getItem(EXPIRES_KEY)
};

export function getUserId() {
    return localStorage.getItem(USERID_KEY)
}

export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(USERID_KEY)
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpires,
  getUserId,
  removeAuthData
};

export default localStorageService