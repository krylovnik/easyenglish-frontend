import Dictionary from "@/src/components/screens/dictionary/Dictionary";
import {NextPageAuth} from "@/src/providers/auth-provider/auth-page.types";

const DictionaryPage: NextPageAuth = () => {
    return (
        <Dictionary />
    )
}
DictionaryPage.isOnlyUser = true
export default DictionaryPage;