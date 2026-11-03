import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectFilteredProducts} from '../store/slices/productsSlice';
import ProductGrid from '../Components/products/ProductGrid';

const ProductPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectFilteredProducts);
  const { loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box>
      <ProductGrid items={items} loading={loading} error={error}/>
    </Box>
  );
};

export default ProductPage;
