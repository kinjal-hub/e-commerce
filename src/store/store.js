import { configureStore } from "@reduxjs/toolkit";
import productsSlice from '../store/slices/productsSlice';
import cartReducer from '../store/slices/cartSlice';
import notificationReducer from '../store/slices/notificationSlice';
import wishListReducer from '../store/slices/wishlistSlice';

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartReducer,
    notification: notificationReducer,
    wishlist: wishListReducer,
  }
});

store.subscribe(() => {
  try {
    
    const cartState = store.getState().cart;
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem("cart", serializedCart);

    
    const wishlistState = store.getState().wishlist;
    const serializedWishlist = JSON.stringify(wishlistState);
    localStorage.setItem("wishlist", serializedWishlist);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
});

export default store;
