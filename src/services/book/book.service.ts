import {instance} from "@/src/api/api.interceptor";
import {IBook, ICreateBook} from "@/src/types/books.interface";

export const BookService = {

    async getAllBooks(difficulty?: number) {
        const response = await instance.get<IBook[]>('/books/getAll', {
            params: {
                difficulty: difficulty !== undefined ? difficulty : undefined
            }
        })
        return response.data
    },
     async createBook(data: FormData): Promise<IBook> {
        const response = await instance.post<IBook>('/books/create', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    async getBookText(bookId: number | string) {
        try {
            const response = await instance.get(`/books/${bookId}/text`);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                throw new Error('Text not found');
            }
            throw error;
        }
    },
    async toggleFavouriteBook(userId: number, bookId: number) {
        try {
            const response = await instance.put(`/books/${userId}/favorites/${bookId}/toggle`);
            return response.data;

        } catch (error) {
            throw error;
        }
    },
    async getFavoriteBooks(userId: number) {
        try {
            const response = await instance.get(`/books/${userId}/favorites`)
            return response.data
        } catch (error) {
            throw error;
        }
    },
    async getBookById(userId: number) {
        try {
            const response = await instance.get(`/books/${userId}`)
            return response.data
        } catch (error) {
            throw error
        }
    }

}