import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container, Button, Box, Rating, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { fetchSpecificProduct } from '../../store/slices/productsSlice';

const ProductDetails = () => {
const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchSpecificProduct(id));
  }, [dispatch, id]);

  const { items, loading, error } = useSelector((state) => state.products)

  if (loading)
  {
    return <Loader />
  } 
  if (error) return <p>Error: {error}</p>;
  const product = items.find((i) => i.id === parseInt(id));

  if (!product) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, mb: 5, minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
        
        
        <Box
          component="img"
          src={product.image}
          alt={product.name}
           sx={{ 
            width: { xs: '100%', md: '450px' },
            height: { xs: '300px', md: '450px' }, 
            borderRadius: '10px', 
            objectFit: 'cover' 
          }} 
        />

        
        <Box display="flex" flexDirection="column" gap={2} textAlign={{ xs: 'center', md: 'left' }}>
          <Typography variant="h3" fontWeight="bold" sx={{ color: 'text.secondary' }}>
            {product.name}
          </Typography>
          
          <Typography variant="h4" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            ${product.price}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.rating}
            </Typography>
            <Rating name="read-only" value={product.rating} precision={0.5} readOnly size="medium" sx={{ color:'text.secondary'}}/>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {product.description}
          </Typography>

          <Button variant="contained" color="primary" size="large" sx={{ mt: 4, maxWidth: '200px', mx: { xs: 'auto', md: '0' } }}>
            Add to Cart
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
