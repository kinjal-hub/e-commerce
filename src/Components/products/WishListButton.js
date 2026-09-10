import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addTowishlist, removeFromwishList } from '../../store/slices/wishlistSlice'; 
import { showNotification } from "../../store/slices/notificationSlice";
const WishlistButton = ({ productId }) => {
  const dispatch = useDispatch();
  
  const isInWishList = useSelector((state) => 
    state.wishlist.items.includes(productId)
  );
  const handleToggle = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    
    if (isInWishList) {
      dispatch(removeFromwishList(productId));
      dispatch(showNotification({
        message: "Item removed from wishlist",
        severity: "info" 
      }));
    } else {
      dispatch(addTowishlist(productId));
      dispatch(showNotification({
        message: "Item added to wishlist!",
        severity: "success" 
      }));
     
    }
  };
 
  return (
    <IconButton 
      onClick={handleToggle} 
      color={isInWishList ? "error" : "default"}
    >
      {isInWishList ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default WishlistButton;
