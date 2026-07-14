import { createSlice } from "@reduxjs/toolkit";
const initialState = { 
  items: [], 
  totalQuantity: 0, 
  totalPrice: 0 
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addtoCart: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.items.find(item => item.id === newProduct.id);
      
      state.totalQuantity++;
      state.totalPrice += newProduct.price;

      if (!existingProduct) {
        state.items.push({ ...newProduct, quantity: 1 });
      } else {
        existingProduct.quantity++;
      }
    },
    incrementQuantity: (state, action) => {
      const id = action.payload;
      const existingProduct = state.items.find(item => item.id === id);
      
      if (existingProduct) {
        existingProduct.quantity++;
        state.totalQuantity++; 
        state.totalPrice += existingProduct.price;
      }
    },
    decrementQuantity: (state, action) => {
      const id = action.payload;
      const existingProduct = state.items.find(item => item.id === id);
      
      if (existingProduct) {
        existingProduct.quantity--;
        state.totalQuantity--; 
        state.totalPrice -= existingProduct.price; 
        
        if (existingProduct.quantity === 0) {
          state.items = state.items.filter(item => item.id !== id);
        }
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingProduct = state.items.find(item => item.id === id);
      
      if (existingProduct) {
        state.totalQuantity -= existingProduct.quantity;
        state.totalPrice -= existingProduct.price * existingProduct.quantity; 
        state.items = state.items.filter(item => item.id !== id); 
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    }
  },
});

export const { addtoCart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
