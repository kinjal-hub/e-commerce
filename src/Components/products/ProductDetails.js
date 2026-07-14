import React from 'react'
import { Container, Paper, Box, Typography, Rating } from '@mui/material';
import CustomButton from './CustomButton';
const ProductDetails = ({id, name, price, category, image, rating, reviews, inStock, stock, description, brand, colors, features }) => {
  return (
    <Container sx={{ mt: 5, mb: 5, minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
         <Box
                   component="img"
                   src={image}
                   alt={name}
                    sx={{ 
                     width: { xs: '100%', md: '450px' },
                     height: { xs: '300px', md: '450px' }, 
                     borderRadius: '10px', 
                     objectFit: 'cover' 
                   }} 
                 />
         <Box display="flex" flexDirection="column" gap={4} textAlign={{ xs: 'center', md: 'left' }}>
                   <Typography variant="h3" fontWeight="bold" sx={{ color: 'text.secondary' }}>
                     {name}
                   </Typography>
                   
                   <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                     Price: ${price}
                   </Typography>
                   <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                     Category: {category}
                   </Typography>
                   <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                     Reviews: {reviews}
                   </Typography>
                   <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                     Stock: {stock}
                   </Typography>
                   <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                     Brand: {brand}
                   </Typography>
                   <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
                     Colors: {colors}
                   </Typography>
                   <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 'bold', gap: 2 }}>
                     Features: {(features.join(', '))}
                   </Typography>
                   
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                     <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                       {rating}
                     </Typography>
                     <Rating name="read-only" value={rating} precision={0.5} readOnly size="medium" sx={{ color:'text.secondary'}}/>
                   </Box>
                   <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                       {description}
                   </Typography>
                  
                   <CustomButton variant="contained" label="Add To Cart" color="primary" size="large" sx={{ mt: 4, maxWidth: '200px', mx: { xs: 'auto', md: '0' } }} />
                   
                 </Box>
                 
                 
                
      </Paper>
    </Container>
  );
}

export default ProductDetails;