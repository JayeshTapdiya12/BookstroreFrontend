import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, Rating } from '@mui/material';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';
import { BookById } from '../Service/BookService';
import { addCart, getBook, getCart } from '../Service/CartService';
import Header from '../compoments/Header';

const AddToBagButton = styled(Button)({
    backgroundColor: '#b71c1c',
    color: '#fff',
    width: '100%',
    '&:hover': {
        backgroundColor: '#8e0000',
    },
});

const WishlistButton = styled(Button)({
    backgroundColor: '#757575',
    color: '#fff',
    width: '100%',
    '&:hover': {
        backgroundColor: '#494949',
    },
});

const PriceBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '10px',
});

const OldPrice = styled(Typography)({
    textDecoration: 'line-through',
    color: 'grey',
    fontSize: '14px',
});

const BookDetail = styled(Typography)({
    marginTop: '16px',
    marginBottom: '16px',
    lineHeight: 1.5,
});

const CustomerFeedback = styled(Box)({
    marginTop: '24px',
});

const SubmitButton = styled(Button)({
    marginTop: '16px',
    backgroundColor: '#1976d2',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#004ba0',
    },
});
const BookPop = () => {

    const { id } = useParams();


    const [book, setBook] = useState({});

    const getBookById = async () => {
        try {
            const data = await BookById(id);
            console.log(data?.data?.note)
            setBook(data?.data?.note)
        } catch (error) {
            console.log(error)
        }
    }
    // console.log(book)
    useEffect(() => {
        getBookById();
    }, [id])

    const [existb, setExistb] = useState({});
    const [cartn, setCartn] = useState("0");

    const adding = async () => {
        try {
            const res = await addCart(id);
            // setCartn(res?.data?.data?.__v)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }


    const getBooks = async () => {
        try {
            const data = await getBook(id)
            console.log(data?.data?.data)
            const res = await getCart(id);
            setCartn(res?.data?.data?.__v)
            // console.log(data)
            setExistb(data?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBooks();
    }, [id])

    return (
        <>
            <Header cartn={cartn} />
            <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3 }}>
                            <CardMedia
                                component="img"
                                height="400"
                                image={book.bookImage}
                                alt={book.title}
                            />
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>

                                        {existb.bookName === book.bookName ? (
                                            <Typography variant="body2">Already in Bag</Typography>
                                        ) : (
                                            <AddToBagButton variant="contained" onClick={adding}>ADD TO BAG</AddToBagButton>
                                        )}


                                    </Grid>
                                    <Grid item xs={6}>
                                        <WishlistButton variant="contained">WISHLIST</WishlistButton>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>


                    <Grid item xs={12} md={8}>

                        <Typography variant="h5" gutterBottom>
                            {book.bookName}
                        </Typography>


                        <Typography variant="body1" color="textSecondary">
                            by {book.author}
                        </Typography>


                        <Box display="flex" alignItems="center" my={1}>
                            <Button
                                sx={{
                                    backgroundColor: '#4caf50',
                                    color: '#ffffff',
                                    fontSize: '12px',
                                    padding: '0 6px',
                                    borderRadius: '4px',
                                }}
                            >
                                4.5 ★
                            </Button>
                            <Typography variant="body2" color="textSecondary" ml={1}>
                                ({book.quantity})
                            </Typography>
                        </Box>


                        <PriceBox>
                            <Typography variant="h5" color="primary">
                                Rs. {book.discountPrice}
                            </Typography>
                            <OldPrice>Rs. {book.price}</OldPrice>
                        </PriceBox>


                        <BookDetail variant="body2">
                            <strong>Book Detail</strong>
                            <br />
                            {book.description}
                        </BookDetail>


                        <CustomerFeedback>
                            <Typography variant="h6">Customer Feedback</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Overall rating
                            </Typography>


                            <Rating name="customer-feedback" defaultValue={0} precision={0.5} />


                            <Box component="textarea" placeholder="Write your review" rows="4" sx={{ width: '100%', marginTop: '10px', padding: '8px' }} />

                            <SubmitButton variant="contained">Submit</SubmitButton>
                        </CustomerFeedback>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default BookPop
