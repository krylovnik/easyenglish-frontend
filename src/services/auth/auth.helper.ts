import Cookie from 'js-cookie'
import {IAuthResponse, ITokens} from "@/src/types/user.interface";

export const getAccessToken = () => {
    const accessToken = Cookie.get('accessToken')
    return accessToken || null
}
export const getUserFromStorage = () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
}
export const saveTokensToStorage = (data: ITokens) => {
    Cookie.set('accessToken',data.accessToken)
    Cookie.set('refreshToken',data.refreshToken)
}

export const removeFromStorage = () => {
    Cookie.remove('accessToken')
    Cookie.remove('refreshToken')
    localStorage.removeItem('user')
}

export const saveToStorage = (data: IAuthResponse) => {
    saveTokensToStorage(data)
    localStorage.setItem('user', JSON.stringify(data.user))
}
