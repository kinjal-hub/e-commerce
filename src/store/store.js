import { configureStore } from "@reduxjs/toolkit";
import productsSlice from '../store/slices/productsSlice';
import  cartReducer from '../store/slices/cartSlice';
const store = configureStore({
     reducer: {
        products: productsSlice,
        cart: cartReducer,
     }
});
store.subscribe (() => {
   try {
      const  cartState = store.getState().cart;
      const serializedState = JSON.stringify(cartState);
      localStorage.setItem("cart", serializedState);
   } catch(err){
      console.error("Could not save cart state to localStorage", err);
   }
  
})

export default store;