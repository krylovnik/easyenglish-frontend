import {IUser} from "@/src/types/user.interface";

export interface IDictionaryState {
    words: IDictionaryWord[]
}

export interface IDictionaryWord  {
    id: number
    word: string
    translation: string
    userDictionary: number
}
export interface IAddWordToDict {
    word: string
    translation: string
}

export interface IUserDictionary {
    id: number;
    user: IUser;
    userId: number;
    words: IDictionaryWord[];
}