import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAuthResponse, ILogin, IRegister} from "@/src/types/user.interface";
import {AuthService} from "@/src/services/auth/auth.service";
import {removeFromStorage} from "@/src/services/auth/auth.helper";
import {errorCatch} from "@/src/api/api.helper";

export const register = createAsyncThunk<IAuthResponse,IRegister>(
    'auth/register',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.register(data)
            return response
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)
export const login = createAsyncThunk<IAuthResponse,ILogin>(
    'auth/login',
    async (data, thunkApi) => {
        try {
            const response = await AuthService.login(data)
            return response
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)
export const logout = createAsyncThunk<void>(
    'auth/logout', async () => {
        removeFromStorage()
    })
export const checkAuth = createAsyncThunk<IAuthResponse>(
    'auth/check-auth',
    async (_ ,thunkApi) => {
        try {
            const response = await AuthService.getNewTokens()
            return response.data
        } catch (e) {
            if(errorCatch(e)==="jwt expired") {
                thunkApi.dispatch(logout())
            }
            return thunkApi.rejectWithValue(e)
        }

    }
)