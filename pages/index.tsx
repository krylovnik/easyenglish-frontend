import Home from "@/src/components/screens/home/Home"
import {NextPageAuth} from "@/src/providers/auth-provider/auth-page.types";

const HomePage: NextPageAuth = () => {
    return <Home />
}
HomePage.isOnlyUser = true

export default HomePage