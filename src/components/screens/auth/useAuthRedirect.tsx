import React, {useEffect} from 'react';
import {useAuth} from "@/src/hooks/useAuth";
import {useRouter} from "next/router";

const UseAuthRedirect = () => {
    const {user} = useAuth()
    const {replace} = useRouter()
    useEffect(()=>{
        if(user) replace('/')
    },[user])
};

export default UseAuthRedirect;