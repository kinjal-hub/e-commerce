import React from 'react'
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import ProductGrid from '../Components/products/ProductGrid';
import Emptystate from '../Components/products/Emptystate';

const WishlistPage = () => {

  const wishListItems = useSelector((state) => state.wishlist.items);
  console.log(wishListItems);
  const allProducts = useSelector((state) => state.products.items || []);
  console.log(allProducts);
  const wishlistedProducts = allProducts.filter((product) =>
    wishListItems.some((wishlistItem) => wishlistItem === product.id)
  );
  console.log(wishlistedProducts);

  return (
    <Box>
      {wishlistedProducts.length === 0 ? (
        <Emptystate message="Your wishlist is empty" />
      ) : (
        <ProductGrid items={wishlistedProducts} loading={false} error={null} />
      )}
    </Box>
  )
}

export default WishlistPage
