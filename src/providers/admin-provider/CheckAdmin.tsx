import {FC, PropsWithChildren} from "react";
import {TypeComponentAuthFields} from "@/src/providers/auth-provider/auth-page.types";
import {useAuth} from "@/src/hooks/useAuth";
import {useRouter} from "next/router";


const CheckAdmin: FC<PropsWithChildren<TypeComponentAuthFields>> =
    ({Component, children}) => {

        const {user} = useAuth()
        const router = useRouter()

        if (user?.isAdmin && Component.isOnlyAdmin) return <>{children}</>

        router.pathname !== '/' && router.replace('/')
        return null
    }
export default CheckAdmin