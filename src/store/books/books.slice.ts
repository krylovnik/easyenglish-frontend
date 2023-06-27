import {createSlice} from "@reduxjs/toolkit";
import {IBookInitialState} from "@/src/types/books.interface";
import {createBook, getAllBooks, getFavoriteBooks, toggleFavoriteBook} from "@/src/store/books/books.actions";


const initialState: IBookInitialState = {
    books: [],
    favorites: [],
    isLoading: false
}
export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllBooks.pending, state => {
                state.isLoading = true;
            })
            .addCase(getAllBooks.fulfilled,(state, {payload})=>{
                state.isLoading = false;
                state.books = payload
            })
            .addCase(getAllBooks.rejected, state => {
                state.isLoading = false
                state.books = []
            })
            .addCase(toggleFavoriteBook.fulfilled, (state,{payload}) => {
                state.favorites = payload.favorites
            })
            .addCase(getFavoriteBooks.fulfilled,(state, {payload})=>{
                state.favorites = payload
            })
            .addCase(createBook.fulfilled,(state,{payload})=> {
                state.books.push(payload)
            })
    }
})