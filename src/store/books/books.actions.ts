import {createAsyncThunk} from "@reduxjs/toolkit";
import {BookService} from "@/src/services/book/book.service";
import {IBook, ICreateBook, ToggleFavouriteBookArgs} from "@/src/types/books.interface";

export interface ICreate  {
    data: ICreateBook
    file: File
}

export const getAllBooks = createAsyncThunk<IBook[], number | undefined>(
    'books/getAll',
    async (difficulty?: number) => {
        try {
            return await BookService.getAllBooks(difficulty)
        } catch (e) {
           throw e;
        }
    }
);
export const getBookById = createAsyncThunk<IBook, number>(
    'books/getById',
    async(userId) => {
        try {
            const response = await BookService.getBookById(userId)
            return response
        } catch(e) {
            throw e;
        }
    }
)
export const toggleFavoriteBook = createAsyncThunk<any,ToggleFavouriteBookArgs>(
    'books/toggleFavoriteBook',
    async ( {userId, bookId} ) => {
        try {
            const response = await BookService.toggleFavouriteBook(userId, bookId);
            return response;
        } catch (e) {
            throw e;
        }}
)
export const getFavoriteBooks = createAsyncThunk<IBook[], number>(
    'books/favorites',
    async (userId) => {
        try {
            return await BookService.getFavoriteBooks(userId)
        } catch (e) {
            throw e
        }
    }
)
export const createBook = createAsyncThunk<IBook, ICreateBook>(
    'book/create',
    async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('text', data.text);
            formData.append('description', data.description);
            formData.append('author', data.author);
            formData.append('difficulty', data.difficulty.toString());
            if (data.coverImage instanceof File) {
                formData.append('coverImage', data.coverImage);
            }
            return await BookService.createBook(formData);
        } catch (e) {
            throw e;
        }
    }
);