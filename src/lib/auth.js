// lib/auth.js

export function getAccesToken() {
  return typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
}

export function getRefreshToken() {
  return typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
}

export function setTokens(accessToken, refreshToken) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
}

export function clearTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
}
