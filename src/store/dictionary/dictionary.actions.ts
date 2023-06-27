import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAddWordToDict, IDictionaryWord} from "@/src/types/dictionary.interface";
import {DictionaryService} from "@/src/services/dictionary/dictionary.service";


export const getAllWords = createAsyncThunk<IDictionaryWord[]>(
    'dictionary/getAll',
    async () => {
        try{
            return await DictionaryService.getAllWords()
        } catch (e) {
            throw e;
        }})

export const addWord = createAsyncThunk<IDictionaryWord,IAddWordToDict>(
    'dictionary/addWord',
    async (word) => {
        try {
            return await DictionaryService.addWord(word)

        } catch (e) {
            throw e
        }})
export const deleteWord = createAsyncThunk<number,number>(
    'dictionary/deleteWord',
    async(wordId) => {
        try {
            await DictionaryService.deleteWord(wordId)
            return wordId
        } catch (e) {
            throw e
        }
    }
)