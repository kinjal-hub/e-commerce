import React from 'react'
import { Drawer, Typography, Box, Grid, Stack, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../store/slices/cartSlice';
import Loader from './Loader';
import CartItem from './CartItem';
import CustomButton from './CustomButton';
const CartDrawer = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const Total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const handleonIncrement = (id) => {
       dispatch(incrementQuantity(id));
      };
    
      const handleonDecrement = (id) => {
        dispatch(decrementQuantity(id));
      };
    
      const handleRemove = (id) => {
        dispatch(removeFromCart(id));
      };
    const handleViewCart = () => {
        navigate('/cart');
        onClose();
    }
    const handleCheckout = () => {
        navigate('/checkout');
        onClose();
    }

  return (
    <Drawer anchor='right' open={open} onClose={onClose}>
      <Stack sx={{ p:2, display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems: 'center', width:'93%'}}>
       <Typography variant='h5'>
         Your Cart
       </Typography>
       <CustomButton color='primary' label='X' variant='contained' onClick={onClose}/> 
       </Stack>
       {cartItems.length ===  0 ? (
               <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                 <Loader  message='Cart is Empty.'/>
               </Box>
             ) : (
               
               <Grid container spacing={4} sx={{justifyContent: "center"}} >
                 <Grid item xs={12} md={8} sx={{alignItems: "center", marginTop:'9px'}}>
                   {cartItems.map((item) => (
                     <CartItem 
                       key={item.id} 
                       item={item} 
                       onIncrement={handleonIncrement} 
                       onDecrement={handleonDecrement} 
                       onRemove={handleRemove} 
                     />
                   ))}
                   <Divider mb='3' />
                    <Typography variant='subtitle1' align= 'center' sx={{fontWeight: 'bold', }}>Total</Typography>
                            <Typography variant='h6' fontWeight='bold' color='primary.main' align= 'center'>
                               ${Total.toFixed(2)}
                   </Typography>
                 </Grid>
       
               
                 
               </Grid>
             )}
             <Stack spacing={1.5} sx={{p:2}}>
            
             <CustomButton color='primary' variant='contained' label='View Cart'  fullWidth  onClick={handleViewCart} />
             <CustomButton color='primary' variant='contained' label='Checkout'  fullWidth  onClick={handleCheckout} /> 
            
             </Stack>
    </Drawer>
  )
}

export default CartDrawer


