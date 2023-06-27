import {FC, PropsWithChildren, useEffect} from "react";
import {TypeComponentAuthFields} from "@/src/providers/auth-provider/auth-page.types";
import dynamic from "next/dynamic";
import {useAuth} from "@/src/hooks/useAuth";
import {useActions} from "@/src/hooks/useActions";
import {useRouter} from "next/router";
import {getAccessToken} from "@/src/services/auth/auth.helper";
import Cookie from "js-cookie";



const DynamicCheckRole = dynamic(()=> import('./CheckAdmin'), {ssr: false})

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = (
    {Component: {isOnlyAdmin}, children}) => {
    const {user} = useAuth()
    const {checkAuth, logout} = useActions()
    const {pathname} = useRouter()
    const isAdmin = user?.isAdmin;

    useEffect(()=>{
        const accessToken = getAccessToken()
        if(accessToken) checkAuth()
    },[])

    useEffect(()=> {
        const refreshToken = Cookie.get('refreshToken')
        if(!refreshToken && user)
            logout();
    }, [pathname])

    return isOnlyAdmin ? (
        <DynamicCheckRole Component={{isOnlyAdmin}}>{children}</DynamicCheckRole>
    ) : (
        <>{children}</>
    )
}
export default AuthProvider