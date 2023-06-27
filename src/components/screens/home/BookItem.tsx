import React, {FC, useEffect, useState} from 'react';
import {IBook} from "@/src/types/books.interface";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import BookModal from "@/src/components/screens/home/modal/BookModal";
import {toggleFavoriteBook} from "@/src/store/books/books.actions";
import {useActions} from "@/src/hooks/useActions";
import {Checkbox, getOffsetLeft} from "@mui/material";
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import {useAuth} from "@/src/hooks/useAuth";
import {useTypedSelector} from "@/src/hooks/useTypedSelector";

const BookItem:FC<{book:IBook}> = ({book}) => {
    const [favorite, setFavorite] = useState(false)
    const {toggleFavoriteBook} = useActions()
    const {user} = useAuth();
    const favorites = useTypedSelector(state => state.books.favorites)

    useEffect(()=>{
        setFavorite(favorites.some(fav => fav.id === book.id))
    },[favorites,book.id])

    const handleChange = () => {
        if (user) {
            toggleFavoriteBook({userId: user.id, bookId: book.id})
        }
    };
    const coverImage = `http://localhost:4200/${book.coverImageUrl}`;
    const difficulty = (bookDifficult: number) => {
        let difficult = null;
        if (bookDifficult === 1) {
            difficult = 'easy'
        } else if (bookDifficult === 2) {
            difficult = 'medium'
        } else {
            difficult = 'hard'
        }
        return difficult
    }
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card
                sx={{height: '100%', display: 'flex', flexDirection: 'column'}}
            >

                <CardMedia
                    component="div"
                    sx={{
                        // 16:9
                        pt: '70.25%',
                    }}
                    image={coverImage || undefined}
                />
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {book.title}
                    </Typography>
                    <Typography sx={{fontWeight:"500"}}>
                        {book.author}
                    </Typography>
                    <Typography sx={{display:"flex"}}>
                        <span
                            style={{
                                border: "2px solid",
                                fontWeight: 500,
                                padding: "0 15px",
                                borderRadius:"10px",
                                marginTop:'10px',
                                color: book.difficulty === 1 ? "#4eef20" : book.difficulty === 2 ? "#f8db34" : "#ef2020"
                            }}>{difficulty(book.difficulty)}</span>
                    </Typography>
                </CardContent>
                <CardActions sx={{display: "flex", justifyContent:"space-between", alignItems:'flex-end'}}>
                    <BookModal book={book} coverImage={coverImage}></BookModal>
                    <Checkbox  checked={favorite}
                               onChange={handleChange}
                               icon={<FavoriteBorder />}
                               checkedIcon={<Favorite />} />
                </CardActions>
            </Card>
        </Grid>
    );
};

export default BookItem;