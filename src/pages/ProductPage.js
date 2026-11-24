import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectFilteredProducts} from '../store/slices/productsSlice';
import ProductGrid from '../Components/products/ProductGrid';
import ProductsFilter from '../Components/products/ProductsFilter';
import ResultSummary from '../Components/products/ResultSummary';

const ProductPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectFilteredProducts);
  const { loading, error } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <ProductsFilter />
      <ResultSummary />
      <ProductGrid items={items} loading={loading} error={error}/>
    </Container>
  );
};

export default ProductPage;
