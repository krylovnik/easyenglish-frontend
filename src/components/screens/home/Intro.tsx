import React, {FC} from 'react';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link as LinkSmooth} from "react-scroll/modules";
import Button from "@mui/material/Button";

const Intro:FC = () => {
    return (
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Easy English
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Обирай улюблену книжку та починай вивчати англійську! Просто натисни на нове слово в тексті
                        книги та отримай його переклад. Додай бажані слова до словника і перевір свої знання
                    </Typography>
                    <Box
                        sx={{pt: 4, display: 'flex', justifyContent: 'center'}}
                    >
                        <LinkSmooth
                            activeClass="active"
                            to="bookList"
                            smooth={true}
                            offset={-70}
                            duration={800}
                        >
                            <Button variant="contained">Обери книжку та почни вивчати</Button>
                        </LinkSmooth>

                    </Box>
                </Container>
            </Box>
    );
};

export default Intro;