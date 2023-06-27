import React, {useEffect, useState} from 'react';
import Meta from "@/src/components/ui/Meta";
import Layout from "@/src/components/ui/Layout";
import Container from "@mui/material/Container";
import {Checkbox, useMediaQuery} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useActions} from "@/src/hooks/useActions";
import {useTypedSelector} from "@/src/hooks/useTypedSelector";
import {IDictionaryWord} from "@/src/types/dictionary.interface";
import ClearIcon from '@mui/icons-material/Clear';
import WordCheck from "@/src/components/screens/dictionary/modal/WordCheck";


const Dictionary = () => {

    const {getAllWords,deleteWord} = useActions()
    useEffect(()=>{
        getAllWords()
    },[])
    const {words} = useTypedSelector(state => state.dictionary)

    const [selectedWords, setSelectedWords] = useState<IDictionaryWord[]>([]);
    const handleCheckboxChange = (word: IDictionaryWord) => {
        if (selectedWords.some((w) => w.word === word.word)) {
            setSelectedWords(selectedWords.filter((w) => w.word !== word.word));
        } else {
            setSelectedWords([...selectedWords, word]);
        }
    };
    const matches = useMediaQuery('(max-width:800px)');
    const matches2 = useMediaQuery('(max-width:450px)');
    return (
        <Meta title="Dictionary">
            <Layout>
                <Container maxWidth="md"
                           sx={{padding: "20px", display: 'flex', flexDirection: matches ? "column" : null,
                               justifyContent: "space-between", gap: '20px'}}>
                    <Box sx={
                        {
                            flex: 1,
                            height: "60vh",
                            overflow: 'auto',
                            border: "1px solid grey",
                            borderRadius: "10px",
                            padding: matches2 ? null : "10px 20px",
                            backgroundColor: "rgb(190,190,255,0.4)",
                            marginTop: matches2 ? "60px" : null
                        }}>
                        {words.map((item) => (
                            <Box key={item.id}
                                 sx={{
                                     display: 'flex',
                                     alignItems: "center",
                                     padding: '20px',
                                     borderBottom: '1px solid #ccc',
                                     scrollSnapAlign: 'start'
                                 }}>
                                <Box sx={{flex: 5, display:"flex", alignItems:"center"}}>
                                    <Checkbox
                                        checked={selectedWords.some((word) => word.word === item.word)}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                    <span style={{fontSize: matches2 ? "14px" : "18px"}}>{item.word}</span>
                                </Box>
                                <Box sx={{paddingRight: "20px",flex: 1}}>
                                    <span style={{fontSize: matches2 ? "14px" : "18px"}}>{item.translation}</span>
                                </Box>
                                <IconButton onClick={()=>{
                                    deleteWord(item.id)
                                }} aria-label="delete">
                                    <ClearIcon />
                                </IconButton>
                            </Box>
                        ))}

                    </Box>
                    <Box sx={{flex: 1}}>
                        <Typography sx={{fontWeight: "500", fontSize: "18px"}}>
                            Оберіть усі слова які ви хочите повторити використовуючи чекбокс навпроти слова та натисніть
                            на кнопку
                        </Typography>
                        <WordCheck selectedWords={selectedWords} setSelectedWords={setSelectedWords}/>
                    </Box>
                </Container>
            </Layout>

        </Meta>
    );
};

export default Dictionary;