import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { clearSelectedProduct, fetchSpecificProduct } from '../store/slices/productsSlice';
import Loader from '../Components/products/Loader';
import ProductDetails from '../Components/products/ProductDetails';

const ProductDetailPage = () => {
const {id} = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(fetchSpecificProduct(id));
     return () => {
      dispatch(clearSelectedProduct())
     };
  }, [dispatch, id]);

  const { selectedProduct, loading, error } = useSelector((state) => state.products)
   
  if (loading)
  {
    return <Loader />
  } 
  if (error) return <p>Error: {error}</p>;
  const product = selectedProduct?.data ? selectedProduct.data : selectedProduct;

  if (!product) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h4">Product not found</Typography>
      </Container>
    );
  }

  return (
    <ProductDetails
    id={product.id}
    image={product.image}
    name={product.name}
    price={product.price}
    rating={product.rating}
    stock={product.stock}
    brand={product.brand}
    reviews={product.reviews}
    category={product.category}
    description={product.description}
    colors={product.colors}
    features={product.features}
    >

    </ProductDetails>
  );
}

export default ProductDetailPage;
