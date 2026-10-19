import React, { useEffect } from 'react'; 
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchProducts } from '../store/slices/productsSlice'; 
import ProductGrid from '../Components/products/ProductGrid';
import Emptystate from '../Components/products/Emptystate';
import Loader from '../Components/products/Loader';
const WishlistPage = () => {
  const dispatch = useDispatch();

  
  const wishListItems = useSelector((state) => state.wishlist.items);
  const { items: allProducts, loading, error } = useSelector((state) => state.products); 

  
  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(fetchProducts()); 
    }
  }, [dispatch, allProducts.length]);

  
  const wishlistedProducts = allProducts.filter((product) =>
    wishListItems.some((wishlistItem) => wishlistItem === product.id)
  );

  
  if (loading && wishlistedProducts.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Loader />
      </Box>
    );
  }

  return (
    <Box>
      {wishlistedProducts.length === 0 ? (
        <Emptystate message="Your wishlist is empty" />
      ) : (
        <ProductGrid items={wishlistedProducts} loading={false} error={error} />
      )}
    </Box>
  );
};

export default WishlistPage;
