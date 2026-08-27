import React from 'react';
import { Container, Paper, Box, Typography, Rating } from '@mui/material';
import CustomButton from './CustomButton';
import { useDispatch } from 'react-redux';
import { addtoCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/notificationSlice';

const ProductDetails = ({ id, name, price, category, image, rating, reviews, inStock, stock, description, brand, colors, features }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.stopPropagation();
    dispatch(addtoCart({ id: id, name: name, price: price, image: image }));
    dispatch(showNotification({ message: "Added to cart", severity: "success" }));
  };

  return (
    <Container sx={{ mt: 5, mb: 5, minHeight: '80vh' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 }, 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'column', md: 'row' }, 
          gap: 4, 
          alignItems: { xs: 'center', md: 'stretch' } 
        }}
      >
        <Box 
          component="img" 
          src={image} 
          alt={name} 
          sx={{ 
            width: { xs: '100%', sm: '500px', md: '450px' }, 
            height: { xs: '300px', sm: '400px', md: '450px' }, 
            borderRadius: '10px', 
            objectFit: 'cover' 
          }} 
        />
        
        <Box 
          display="flex" 
          flexDirection="column" 
          gap={4} 
          justifyContent="space-between" 
          flex={1} 
          textAlign={{ xs: 'center', sm: 'center', md: 'left' }}
          width="100%"
        >
          
          <Typography variant="h4" fontWeight="bold" sx={{ color: 'text.secondary' }}>
            {name}
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Price: ${price}
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Category: {category}
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Reviews: {reviews}
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Stock: {stock}
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Brand: {brand}
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Colors: {colors}
          </Typography>
          
          <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
            Features: {features ? features.join(', ') : ''}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'left', md: 'flex-start' } }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              {rating}
            </Typography>
            <Rating name="read-only" value={rating} precision={0.5} readOnly size="medium" sx={{ color: 'text.secondary' }} />
          </Box>
          
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
          <Box sx={{ mt: '35px'}}>
          <CustomButton 
            onClick={handleClick} 
            variant="contained" 
            label="Add To Cart" 
            color="primary" 
            size="large" 
            sx={{ mt: 'auto', maxWidth: '200px', mx: { xs: 'auto', md: '0' }, width: '100%' }} 
          />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
