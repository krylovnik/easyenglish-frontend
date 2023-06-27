import {IUser} from "@/src/types/user.interface";

export interface ICreateBook {
    title: string,
    text: string,
    description: string,
    author: string,
    coverImage: File,
    difficulty: number
}
export interface IBook{
    id: number
    favorites: IUser[]
    title: string,
    text: string,
    description: string,
    author: string,
    coverImageUrl?: string | null,
    difficulty: number
}
export interface IBookInitialState {
    books: IBook[]
    favorites: IBook[]
    isLoading: boolean
}
export interface ToggleFavouriteBookArgs {
    userId: number;
    bookId: number;
}