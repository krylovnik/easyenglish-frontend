import React, {useEffect, useState} from 'react';
import Meta from "@/src/components/ui/Meta";
import Container from "@mui/material/Container";
import Layout from "@/src/components/ui/Layout";
import Box from "@mui/material/Box";
import {useRouter} from "next/router";
import Typography from "@mui/material/Typography";
import ProcessedBookText from "@/src/components/screens/book/ProcessedBookText";
import {useActions} from "@/src/hooks/useActions";
import {BookService} from "@/src/services/book/book.service";
import {IBook} from "@/src/types/books.interface";
import {instance} from "@/src/api/api.interceptor";
import {useMediaQuery} from "@mui/material";

const Book = () => {
    const matches = useMediaQuery('(max-width:650px)');
    const router = useRouter();
    const {id} = router.query;
    const {getBookById} = useActions();
    const [book, setBook] = useState<IBook | null>(null);
    const [bookText, setBookText] = useState<string>("");
    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                const response = await BookService.getBookById(+id);
                setBook(response)
                const bookTextResponse = await instance.get(`http://localhost:4200/${response.textUrl}`)
                setBookText(bookTextResponse.data);
            }
        }
        fetchBook();
    }, [id]);
    return (
        <Meta title="Book">
            <Layout>
                <main>
                    <Container sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: 'auto',
                        filter: ' drop-shadow(1px 1px 5px black)'
                    }} maxWidth={matches ? 'xl' : 'md'}>
                        <Box sx={{
                            top: '10px',
                            backgroundColor: "rgb(255,238,227)",
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                            height: 'auto',
                            padding: matches ? '40px 20px 20px 20px' : '30px 80px 50px 80px',
                            borderRadius: '30px',
                            m: "50px 0 50px 0"
                        }}>
                            <Typography component={'span'} variant="h6">{book && book.title}</Typography>
                            <Typography component={'span'} mt={5} sx={{fontSize: "20px", color: "#383838"}}>
                                <ProcessedBookText text={bookText}/>
                            </Typography>
                        </Box>
                    </Container>
                </main>
            </Layout>
        </Meta>
    );
};

export default Book;