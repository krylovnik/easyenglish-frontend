import Cookie from "js-cookie";
import {IAuthResponse, ILogin, IRegister} from "@/src/types/user.interface";
import {saveToStorage} from "@/src/services/auth/auth.helper";
import {instance} from "@/src/api/api.interceptor";

export const AuthService = {

    async login(data: ILogin) {
        const response = await instance<IAuthResponse>({
            url: `/auth/login`,
            method: 'POST',
            data
        })
        if (response.data.accessToken) saveToStorage(response.data)
        return response.data
    },
    async register(data: IRegister) {
        const response = await instance<IAuthResponse>({
            url: `/auth/register`,
            method: 'POST',
            data
        })
        if (response.data.accessToken) saveToStorage(response.data)
        return response.data
    },

    async getNewTokens() {
        const refreshToken = Cookie.get('refreshToken')
        const response = await instance.post<string, { data: IAuthResponse}>
        ('auth/login/tokens', {refreshToken})
        if (response.data.accessToken) {
            saveToStorage(response.data)
        }
        return response
    }
}