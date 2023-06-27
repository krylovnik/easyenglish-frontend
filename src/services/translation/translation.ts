import axios from "axios";
const apiKey = 'AIzaSyAfPeiW8YXN5BQJ2ofygfZHVpQlVehsH9k';
const sourceLanguage = 'en';
const targetLanguage = 'uk';


export const translateWithApi = async (text:string)=> {
    try {
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                q: text,
                source: sourceLanguage,
                target: targetLanguage,
            }
        );

        const translatedText = response.data.data.translations[0].translatedText;
        return translatedText;
    } catch (error) {
        throw error;
    }
}
