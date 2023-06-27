import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {IBook} from "@/src/types/books.interface";
import Image from "next/image";
import Container from "@mui/material/Container";
import Link from "next/link";
import {useMediaQuery} from "@mui/material";


interface BookModalProps {
    book: IBook
    coverImage: string
}

const BookModal: FC<BookModalProps> = ({book, coverImage}) => {
    const matches = useMediaQuery('(max-width:1000px)');
    const matches2 = useMediaQuery('(max-width:500px)');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button onClick={handleOpen}>Читати</Button>
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
                    border: '1px solid #000',
                    borderRadius: "20px",
                    boxShadow: 24,
                    width:  matches ? '90vw': '50vw',
                    height: '90vh',
                    p: 4,
                    backgroundColor: matches2 ? "white" : "",
                    overflow: matches2 ? 'auto' : ''
                }}>
                    <Image src={coverImage} alt={"cover image"} fill={true}
                           style={{borderRadius: "20px", zIndex: "0", filter: "blur(2px)"}}
                    />
                    <Box sx={
                        {
                            display:"flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            position: 'absolute',
                            top: 0, left: 0,
                            zIndex: "1",
                            padding: "20px",
                            width: "100%",
                            height: "100%",
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: "20px",
                        }}>
                        <Container sx={{
                            display: 'flex',
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                {book.title}
                            </Typography>
                            <Typography variant="h6" sx={{marginTop: "10px"}}>{book.author}</Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2,fontSize: "20px"}}>
                                {book.description}
                            </Typography>

                        </Container>
                        <Button size="large">
                            <Link style={{color:"inherit",textDecoration:'none'}} href={`/book/${book.id}`} >
                                Читати
                            </Link>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default BookModal;