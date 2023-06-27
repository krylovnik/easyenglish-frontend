import * as userActions from './user/user.actions'
import * as booksActions from './books/books.actions'
import * as dictionaryActions from './dictionary/dictionary.actions'
import {userSlice} from "@/src/store/user/user.slice";
import {booksSlice} from "@/src/store/books/books.slice";

export const rootActions = {
    ...userActions,
    ...booksActions,
    ...dictionaryActions,
    ...userSlice.actions,
}
