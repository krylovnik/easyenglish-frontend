import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import {IDictionaryWord} from "@/src/types/dictionary.interface";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {useMediaQuery} from "@mui/material";

const WordCheck: FC<any> = ({selectedWords, setSelectedWords}) => {
    const matches = useMediaQuery('(max-width:800px)');
    const [randomArray, setRandomArray] = useState<IDictionaryWord[]>([])
    const [open, setOpen] = React.useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userTranslation, setUserTranslation] = useState<string>('');
    const [answered, setAnswered] = useState<boolean>(false)
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null)
    const [disabledInput,setDisabledInput] = useState<boolean>(false)

    const shuffleArray = (array: IDictionaryWord[]) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    const handleClose = () => {
        setOpen(false)
        setSelectedWords([])
        setRandomArray([])
        setAnswered(false)
        setIsAnswerCorrect(null)
        setUserTranslation('')
        setCurrentIndex(0)
        setDisabledInput(false)
    }
    const handleTranslationChange = (event: any) => {
        setUserTranslation(event.target.value);
    };
    const checkAnswer = () => {
        setAnswered(true)
        setDisabledInput(true)
        if (userTranslation.toLowerCase() === randomArray[currentIndex].translation.toLowerCase()) {
            setIsAnswerCorrect(true)
        } else {
            setIsAnswerCorrect(false)
        }
    }
    const nextWord = () => {
        setCurrentIndex(prevState => prevState+1)
        setAnswered(false)
        setIsAnswerCorrect(null)
        setUserTranslation('')
        setDisabledInput(false)
    }
    const startCheck = () => {
        setOpen(true);
        setRandomArray(shuffleArray(selectedWords))
    }

    return (
        <Box>
            <Button onClick={startCheck} sx={{mt: "10px"}} variant="contained">Почати перевірку</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: "20px",
                    boxShadow: 24,
                    width: matches ?"80vw" : '50vw',
                    height: '90vh',
                    p: 4,

                }}>
                    <Box sx={
                        {
                            display: "flex",
                            flexDirection: "column",
                            alignItems:"center",
                            justifyContent:"center",
                            position: 'absolute',
                            top: 0, left: 0,
                            padding: "20px",
                            width: "100%",
                            height: "100%",
                            backgroundColor: 'rgba(255,255,255)',
                            borderRadius: "20px",
                            border: isAnswerCorrect ? "5px solid #00ff0f" : isAnswerCorrect === null ? "" : "5px solid red"
                        }}>
                            {selectedWords.length === 0 ?
                                    <Typography sx={{
                                        fontWeight: "600",
                                        color: "#363636",
                                    }}  variant={"h5"}>Спочатку оберіть якісь слова для перевірки</Typography>
                                :
                                <Box sx={{
                                    display:"flex",
                                    flexDirection:"column",
                                    alignItems: "center",
                                    gap: "50px",
                                }}>
                                    <Typography sx={{
                                        fontWeight: "600",
                                        color: "#363636"
                                    }} variant={"h4"}>{currentIndex + 1} слово з {selectedWords.length}
                                    </Typography>
                                    <Typography variant={"h5"}>{randomArray.length && randomArray[currentIndex].word}</Typography>
                                    <TextField
                                        disabled={disabledInput}
                                        inputProps={{
                                            style: { textAlign: 'center' },
                                        }}
                                        placeholder={'Введіть переклад'}
                                        value={userTranslation} onChange={handleTranslationChange}/>
                                    <Button
                                        onClick={checkAnswer}
                                        variant={"outlined"}
                                        disabled={answered}>Відповісти</Button>
                                    {answered && <Button
                                        onClick={nextWord}
                                        disabled={currentIndex+1 === randomArray.length}
                                        variant={"outlined"}>Наступне слово</Button>}
                                </Box>
                            }
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default WordCheck;