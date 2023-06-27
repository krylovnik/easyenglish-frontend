import {NextPageAuth} from "@/src/providers/auth-provider/auth-page.types";
import Book from "@/src/components/screens/book/Book";

const BookPage: NextPageAuth = () => {
    return (
        <Book />
    )
}
BookPage.isOnlyUser = true
export default BookPage;