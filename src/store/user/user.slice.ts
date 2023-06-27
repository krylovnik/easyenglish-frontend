import {IInitialState} from "@/src/types/user.interface";
import {createSlice} from "@reduxjs/toolkit";
import {checkAuth, login, logout, register} from "@/src/store/user/user.actions";
import {getStoreLocal} from "@/src/utils/local-storage";

const initialState: IInitialState = {
    user: getStoreLocal('user'),
    isLoading: false,
    error: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.user = null
        }
    },
    extraReducers: builder => {
        builder
            .addCase(register.pending, state => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled,(state, {payload})=>{
                state.isLoading = false;
                state.user = payload.user
            })
            .addCase(register.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled,(state, {payload})=>{
                state.isLoading = false;
                state.user = payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.error = action.error.message;
            })
            .addCase(logout.rejected, state => {
                state.isLoading = false
                state.user = null
            })
            .addCase(checkAuth.fulfilled, (state,{payload})=>{
                state.user = payload.user
            })
    }
})