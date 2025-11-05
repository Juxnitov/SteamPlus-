// Interceptor/apiClient.js

import { getAccesToken , getRefreshToken, setTokens, clearTokens}from './auth'
import { routesPublics } from './routesPublics'

export async function apiFetch(url, options = {})
{
    const isPublicRoute = routesPublics.some(route => url.startsWith(route))

    let accessToken = getAccesToken()
    let refreshToken = getRefreshToken()

    const headers =
    {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
        ...(isPublicRoute ? {} : {'Authorization': `Bearer ${accessToken}`})
        
    }

    const config = {
        ...options,
        headers
    }
    let response = await fetch(url, config)

    if(response.status === 401 && !isPublicRoute){
        const refresh_token = getRefreshToken()

        // TODO: llamar el endpoint de refresh token
        const isRefreshed = await refreshAccesToken(refresh_token)

        if(isRefreshed){
            accessToken = getAccesToken()
            const retryHeaders = {
                ...headers,
                'Authorization': `Bearer ${accessToken}`
            }
            response = await fetch(url, {...options, headers: retryHeaders})
        }else{
            clearTokens()
            throw new Error('No se pudo refrescar el token')
        }
    }
    return response
}

async function refreshAccesToken(refresh_token) {
  try {
    const response = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: refresh_token }) // 👈 cambio
    });

    if (!response.ok) return false;

    const data = await response.json();
    if (data.accessToken && data.refreshToken) {
      setTokens(data.accessToken, data.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    clearTokens();
    return false;
  }
}
