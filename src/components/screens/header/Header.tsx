import React, {useState} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import Typography from "@mui/material/Typography";
import BookIcon from "@mui/icons-material/Book";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import {useActions} from "@/src/hooks/useActions";
import {Drawer, useMediaQuery} from "@mui/material";


const Header = () => {
    const matches = useMediaQuery('(max-width:450px)');
    const {logout, resetUser} = useActions()
    return (
        <>
            <CssBaseline/>
            <AppBar position={matches ? "fixed" : "relative"}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box sx={{
                        display:'flex', alignItems: 'center', '&:hover': {
                            color: '#00FF00', cursor: 'pointer'
                        }
                    }}>
                        <HomeIcon sx={{mr: 1}}></HomeIcon>
                        <Typography variant="h6" color="inherit" noWrap>
                            <Link style={{textDecoration: "none", color: 'inherit'}} href={"/"}>Home page</Link>
                        </Typography>
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center', '&:hover': {
                                color: '#00FF00', cursor: 'pointer'
                            }
                        }}>
                            <BookIcon sx={{mr: 1}}/>
                            <Typography variant="h6" color="inherit" noWrap>
                                <Link style={{textDecoration: "none", color: 'inherit'}}
                                      href={"/dictionary"}>Словник</Link>
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', '&:hover': {
                                color: '#00FF00', cursor: 'pointer'
                            }
                        }}>
                            <LogoutIcon onClick={() => {
                                logout()
                                resetUser()
                            }} sx={{mr: 1, ml: 5}}/>
                            <Typography sx={{display: matches ? "none" : "",}} variant="h6" color="inherit" noWrap onClick={() => {
                                logout()
                                resetUser()
                            }}>
                                Logout
                            </Typography>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;