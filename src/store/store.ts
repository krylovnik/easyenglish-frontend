import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "@/src/store/user/user.slice";
import {booksSlice} from "@/src/store/books/books.slice";
import {dictionarySlice} from "@/src/store/dictionary/dictionary.slice";

const rootReducer = combineReducers({
    user: userSlice.reducer,
    books: booksSlice.reducer,
    dictionary: dictionarySlice.reducer
})
export const store= configureStore({
    reducer: rootReducer
})
export type TypedRootState = ReturnType<typeof rootReducer>