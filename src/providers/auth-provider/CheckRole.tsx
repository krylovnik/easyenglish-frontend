import {FC, PropsWithChildren} from "react";
import {TypeComponentAuthFields} from "@/src/providers/auth-provider/auth-page.types";
import {useAuth} from "@/src/hooks/useAuth";
import {useRouter} from "next/router";


const CheckRole: FC<PropsWithChildren<TypeComponentAuthFields>> =
    ({Component, children}) => {

        const {user} = useAuth()
        const router = useRouter()

        if (user && Component.isOnlyUser) return <>{children}</>

        router.pathname !== '/auth' && router.replace('/auth')
        return null
    }
export default CheckRole