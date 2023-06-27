import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from "@mui/material/IconButton";

const Footer:FC = () => {
    return (
            <Box sx={{bgcolor: '#151515', p: 6}} component="footer">
                <Typography color="white"  align="right" gutterBottom>
                    Developer: krylov.nik33@gmail.com
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="right"
                    color="white"
                    component="p"
                >
                    <IconButton sx={{color:"white"}}><InstagramIcon/></IconButton>
                    <IconButton sx={{color:"white"}}><FacebookIcon/></IconButton>
                    <IconButton sx={{color:"white"}}><TwitterIcon/></IconButton>
                </Typography>
            </Box>
    );
};

export default Footer;