import React, {FC} from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import {FormState, SubmitHandler, UseFormRegister} from "react-hook-form";
import {ILogin, IRegister} from "@/src/types/user.interface";
import {validEmail} from "@/src/components/screens/auth/valid-email";
import {useTypedSelector} from "@/src/hooks/useTypedSelector";

type LoginType = 'login' | 'register';

interface RegisterFormProps {
    setType: React.Dispatch<React.SetStateAction<LoginType>>;
    onFormSubmit: SubmitHandler<IRegister>;
    formRegister: UseFormRegister<IRegister | ILogin>;
    handleSubmit: any;
    formState: FormState<IRegister>;
}

const RegisterForm: FC<RegisterFormProps> = (
    {
        setType,
        onFormSubmit,
        formRegister,
        formState,
        handleSubmit
    }) => {
    return (
        <>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onFormSubmit)} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Account Name"
                            autoComplete="name"
                            {...formRegister("name", {
                                required: "Field can not be empty",
                                minLength: {
                                    value: 2,
                                    message: 'Name minimal length is 2 symbols'
                                }
                            })}
                            error={!!formState.errors.name?.message}
                            helperText={formState.errors.name?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            {...formRegister("email", {
                                required: "Field can not be empty",
                                pattern: {
                                    value: validEmail,
                                    message: "Incorrect email format"
                                }
                            })}
                            error={!!formState.errors.email?.message}
                            helperText={formState.errors.email?.message}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...formRegister("password", {
                                required: "Field can not be empty",
                                minLength: {
                                    value: 6,
                                    message: 'Password length should be between 6 and 20 symbols'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'Password length should be between 6 and 20 symbols'
                                }
                            })}
                            error={!!formState.errors.password?.message}
                            helperText={formState.errors.password?.message}

                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => {
                                    setType('login')
                                }}>
                                    {"Є аккаунт ? Увійди"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}
export default RegisterForm;