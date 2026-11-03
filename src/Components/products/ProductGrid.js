import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import Emptystate from './Emptystate';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { selectFilteredProducts } from '../../store/slices/productsSlice';

const ProductGrid = ({  loading, error }) => {
  const filteredProducts = useSelector(selectFilteredProducts);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Typography>Error: {'Failed to fetch product'}</Typography>;
  }
  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <Typography variant='h5' sx={{ justifySelf: 'center',  }}>
        <Emptystate sx={{color: 'text.secondary'}} message="Specific product u found not match"/>
      </Typography>
    );
  }

  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ mt: {xs:'20px', md: '110px'}, px: { xs: 6.5, sm: 3, md: 5}, width: '100%',  overflowX:'hidden'}} 
       justifyContent='center' 
      alignItems='stretch'
    >
      {filteredProducts.map((p) => (
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
