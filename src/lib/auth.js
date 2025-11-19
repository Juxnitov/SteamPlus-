// lib/auth.js

export function getAccesToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null;
}

export function setTokens(accessToken, refreshToken) {
  if (typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    // Disparar evento personalizado para notificar cambios de autenticación
    window.dispatchEvent(new Event('auth-change'));
  }
}

export function clearTokens() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    // Disparar evento personalizado para notificar cambios de autenticación
    window.dispatchEvent(new Event('auth-change'));
  }
}
