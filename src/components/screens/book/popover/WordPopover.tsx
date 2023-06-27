import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {FC} from "react";
import Box from "@mui/material/Box";
import {useActions} from "@/src/hooks/useActions";

const WordPopover:FC<any> = ({anchorEl, setAnchorEl, word, translate,setSelectedWord,setTranslate}) => {
    const handleClose = () => {
        setAnchorEl(null);
        setSelectedWord('')
        setTranslate('')
    };
    const {addWord} = useActions()

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ p: 3 , display:'flex', flexDirection:'column',alignItems:"center"}}>
                    <Typography sx={{mb:"10px",fontWeight:"500",fontSize:"18px"}}>{word} : {translate}</Typography>
                    <Button onClick={()=>{
                        addWord({word: word , translation: translate})
                        handleClose()
                    }}>Додати до словника</Button>
                </Box>
            </Popover>
        </div>
    );
}
export default WordPopover;