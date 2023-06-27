import {instance} from "@/src/api/api.interceptor";
import {IAddWordToDict, IDictionaryWord} from "@/src/types/dictionary.interface";

export const DictionaryService = {
    async getAllWords() {
        const response = await instance.get<IDictionaryWord[]>('dictionary/all')
        return response.data
    },
    async addWord (word: IAddWordToDict) {
        try {
            const response = await instance.post<IDictionaryWord>('/dictionary/add', word);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    async deleteWord (wordId: number)  {
        try {
            await instance.delete(`/dictionary/delete/${wordId}`);
        } catch (error) {
            throw error;
        }
    }
}
