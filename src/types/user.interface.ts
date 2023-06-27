import {IBook} from "@/src/types/books.interface";
import {IUserDictionary} from "@/src/types/dictionary.interface";

export interface IUser extends IUserState {
    id: number
    password: string
}
export interface IUserState {
    id: number
    name: string
    email: string
    isAdmin: boolean
    favorites: IBook[];
    dictionary: IUserDictionary
}
export interface ITokens {
    accessToken: string
    refreshToken: string
}
export interface IInitialState{
    user: IUserState | null
    isLoading: boolean
    error: string | undefined
}
export interface ILogin {
    email: string
    password: string
}
export interface IRegister {
    name: string
    email: string
    password: string
}
export interface IAuthResponse extends ITokens {
    user: IUser
}