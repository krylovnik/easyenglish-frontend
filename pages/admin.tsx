import Admin from "@/src/components/screens/admin/Admin";
import {NextPageAuth} from "@/src/providers/auth-provider/auth-page.types";
import AdminProvider from "@/src/providers/admin-provider/AdminProvider";

const AdminPage: NextPageAuth = () => {
    return (
        <AdminProvider Component={{ isOnlyAdmin: true }}>
            <Admin/>
        </AdminProvider>
    )
}
export default AdminPage;