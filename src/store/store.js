import { configureStore } from "@reduxjs/toolkit";
import productsSlice from '../store/slices/productsSlice';
import  cartReducer from '../store/slices/cartSlice';
const store = configureStore({
     reducer: {
        products: productsSlice,
        cart: cartReducer,
     }
});

export default store;