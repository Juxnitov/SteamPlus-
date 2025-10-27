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
        ...Options,
        headers
    }
    let response = await fetch(url, config)

    if(response.status === 401 && !isPublicRoute){
        const refresh_token = getRefreshToken()

        // TODO: llamar el endpoint de refresh token
        const isRefreshed = await refreshAccesToken(refresh_token)

        if(!isRefreshed){
            return new Error ('No se pudo refrescar el token')
        }
        access_token = getAccesToken()
        const retryHeaders = {
            ...headers,
            'Authorization': `Bearer ${access_token}`
        }
    }

    response = await fetch(url, {...options, headers: retryHeaders})
}

async function refreshAccesToken(refresh_token){
    try{
        // TODO: llamar al endpoint de refresh token
        // este endpoint aun no existe se debe crear de crear en los api routes
        const response = await fetch ('api/auth/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({refresh_token})
        })
        if(!response.ok) return false
        const data = await response.json()
        
        if(data.access_token, data.refresh_token){
            setTokens(data.access_token, data.refresh_token)
            return true
        }

    }catch(error){
        clearTokens()
        false
    }
}