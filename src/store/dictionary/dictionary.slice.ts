import {createSlice} from "@reduxjs/toolkit";
import {IDictionaryState} from "@/src/types/dictionary.interface";
import {addWord, deleteWord, getAllWords} from "@/src/store/dictionary/dictionary.actions";

const initialState:IDictionaryState = {
    words: []
}
export const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllWords.fulfilled, (state,{payload}) => {
                state.words = payload
            })
            .addCase(addWord.fulfilled, (state,{payload}) => {
                state.words.push(payload)
            })
            .addCase(deleteWord.fulfilled, (state, { payload }) => {
                state.words = state.words.filter((word) => word.id !== payload);
            })
    }
})