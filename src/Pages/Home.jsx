import React, { useEffect, useState } from 'react'
import '../Style/Home.css'
// import { Card, CardMedia, CardContent, Typography, Box, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';
import { getAllBook } from '../Service/BookService';

import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useParams } from 'react-router-dom';
import { getCart } from '../Service/CartService';
import Header from '../compoments/Header';


const Price = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
}));

const OldPrice = styled(Typography)(({ theme }) => ({
    textDecoration: 'line-through',
    color: 'grey',
    fontSize: '14px',
}));

const RatingButton = styled(Box)(({ theme }) => ({
    backgroundColor: '#4caf50',
    color: '#ffffff',
    fontSize: '12px',
    padding: '0 6px',
    borderRadius: '4px',
    display: 'inline-block',
}));

const Home = () => {

    const [book, setBook] = useState([]);
    const [cartn, setCartn] = useState('0')
    const { id } = useParams();

    const getBook = async () => {
        try {
            const res = await getAllBook();
            console.log(res?.data?.note)
            const data = await getCart(id);
            console.log(data?.data?.data?.__v)
            setCartn(data?.data?.data?.__v)

            setBook(res?.data?.note)
        } catch (error) {
            console.log("error in home jsx ==============>", error)
        }
    }
    useEffect(() => {
        getBook();
    }, [])


    return (
        <>
            <Header cartn={cartn} />
            <Container maxWidth="lg" sx={{ paddingTop: '2rem' }}>
                <Grid container spacing={2} justifyContent="center">
                    {book.map((ele) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={ele.id}>

                            <Link to={`/book/${ele._id}`} key={ele._id}>

                                <Card sx={{ maxWidth: 300, margin: '0 auto', boxShadow: 3 }}>

                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={ele.bookImage}
                                        alt={ele.bookName}
                                    />


                                    <CardContent>

                                        <Typography variant="h6" component="div" gutterBottom>
                                            {ele.bookName}
                                        </Typography>

                                        <Typography variant="body2" color="textSecondary">
                                            {ele.author}
                                        </Typography>


                                        <Box display="flex" alignItems="center" my={1}>
                                            <RatingButton>
                                                4.5 ★
                                            </RatingButton>
                                            <Typography variant="body2" color="textSecondary" ml={1}>
                                                ({ele.quantity})
                                            </Typography>
                                        </Box>


                                        <Price>
                                            <Typography variant="h6" color="textPrimary">
                                                Rs. {ele.discountPrice}
                                            </Typography>
                                            <OldPrice variant="body2">
                                                Rs. {ele.price}
                                            </OldPrice>
                                        </Price>
                                    </CardContent>
                                </Card>
                            </Link>

                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default Home
