import React, {FC, useState} from 'react';
import Meta from "@/src/components/ui/Meta";
import {useActions} from "@/src/hooks/useActions";
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {SubmitHandler, useForm} from "react-hook-form";
import {ILogin, IRegister} from "@/src/types/user.interface";
import LoginForm from "@/src/components/screens/auth/forms/LoginForm";
import RegisterForm from "@/src/components/screens/auth/forms/RegisterForm";
import useAuthRedirect from "@/src/components/screens/auth/useAuthRedirect";


const Auth: FC = () => {
    useAuthRedirect()

    const {login, register} = useActions()
    const [type, setType] = useState<'login' | 'register'>('login')
    const {register: formRegister, handleSubmit, formState, reset} = useForm<IRegister | ILogin>({
        mode: "onChange"
    })
    const onSubmit: SubmitHandler<IRegister | ILogin> = (data: IRegister | ILogin) => {
        if (type === 'login') {
            const loginData: ILogin = data as ILogin;
            login(loginData)
        } else {
            const registerData: IRegister = data as IRegister;
            register(registerData)
        }
        reset();
    }
    return (
        <Meta title='Auth'>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/images/auth-background.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                />

                {type === 'login' ?
                    <LoginForm setType={setType}
                               onFormSubmit={onSubmit}
                               formRegister={formRegister}
                               handleSubmit={handleSubmit}
                               formState={formState} />
                    :
                    <RegisterForm setType={setType}
                                  onFormSubmit={onSubmit}
                                  formRegister={formRegister}
                                  handleSubmit={handleSubmit}
                                  formState={formState} />
                }

            </Grid>
        </Meta>
    );
};

export default Auth;