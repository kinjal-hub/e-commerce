import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Loader from './Loader';

const ProductGrid = ({ items, loading, error }) => {
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Typography>Error: {'Failed to fetch product'}</Typography>;
  }
  if (!items || items.length === 0) {
    return (
      <Typography variant='h5' sx={{ justifySelf: 'center', color: 'text.secondary' }}>
        No products found.
      </Typography>
    );
  }

  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ mt: '10px', px: { xs: 9, sm: 3, md: 5}, width: '100%',  overflowX:'hidden'}} 
       justifyContent='center' 
      alignItems='stretch'
    >
      {items.map((p) => (
        <Grid 
          item 
          key={p.id}  
        >
          <ProductCard 
            id={p.id} 
            image={p.image} 
            name={p.name} 
            price={p.price} 
            rating={p.rating} 
            inStock={p.inStock} 
            brand={p.brand} 
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
