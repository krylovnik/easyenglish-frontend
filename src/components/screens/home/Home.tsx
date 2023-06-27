import React, {FC, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Meta from "@/src/components/ui/Meta";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import BookItem from "@/src/components/screens/home/BookItem";
import {useTypedSelector} from "@/src/hooks/useTypedSelector";
import {useActions} from "@/src/hooks/useActions";
import Intro from "@/src/components/screens/home/Intro";
import Layout from "@/src/components/ui/Layout";
import {useAuth} from "@/src/hooks/useAuth";

interface ISort  {
    label: string,
    id: number
}
const sortByDifficult:ISort[] = [
    {label: "easy", id: 1},
    {label: "medium", id: 2},
    {label: "hard", id: 3}
]
const Home: FC = () => {
    const [searchByTitle, setSearchByTitle] = useState('')
    const [autoCompleteData,setAutoCompleteData] = useState<ISort  | null>(null)
    const {user} = useAuth()
    const {getAllBooks,getFavoriteBooks} = useActions()
    useEffect(() => {
        if(autoCompleteData !== null) {
            getAllBooks(autoCompleteData.id);
        } else (
            getAllBooks()
        )
    }, [autoCompleteData])
    useEffect(()=>{
        {user && getFavoriteBooks(user.id)}
    },[])

    const {books,favorites} = useTypedSelector((state) => state.books)
    const sortedPosts = books.filter(b => b.title.includes(searchByTitle))
    return (
        <Meta title={"Home"}>
            <Layout>
                <main>
                    <Intro/>
                    <Box sx={{
                        minHeight: '360px',
                        pt: 8,
                        pb: 6,
                        backgroundColor: "#fff1e7"
                    }}>
                        <Typography component="h2"
                                    variant="h3"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom>Обране</Typography>
                        <Container sx={{py: 8}} maxWidth="md">
                            <Grid container spacing={4}>
                                {favorites.length !== 0 ? favorites.map((book) => (
                                        <BookItem key={book.id} book={book}/>
                                    )) :
                                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                        Додавайте книжки які ви вподобали до обраного і наступного часу ви знайдете їх
                                        тут
                                    </Typography>
                                }
                            </Grid>
                        </Container>
                    </Box>
                    <Box sx={{minHeight: '580px', backgroundColor: '#ffffc3', pt: 8, pb: 6,}}>
                        <Typography id='bookList' component="h2"
                                    variant="h3"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom>Книжки</Typography>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                            padding: "10px"
                        }}>
                            <Autocomplete
                                value={autoCompleteData}
                                onChange={(e,value)=>setAutoCompleteData(value)}
                                disablePortal
                                id="combo-box-demo"
                                options={sortByDifficult}
                                sx={{width: 200, backgroundColor: "white"}}
                                renderInput={(params) => <TextField {...params} label="Складність"/>}
                            />
                            <TextField
                                value={searchByTitle}
                                onChange={(e)=>{setSearchByTitle(e.target.value)}}
                                id="search"
                                label="Шукати книжку за назвою"
                                name="search"
                                sx={{width: '600px', backgroundColor: 'white', ml: 5}}
                                autoComplete="off"
                            />
                        </Box>


                        <Container sx={{py: 8}} maxWidth="md">
                            <Grid container spacing={4}>
                                {sortedPosts.map((book) => (
                                    <BookItem key={book.id} book={book}/>
                                ))}
                            </Grid>
                        </Container>
                    </Box>

                </main>
            </Layout>
        </Meta>
    );
}
export default Home;