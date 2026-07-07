import { Container, Box, Grid, Typography } from '@mui/material';
import Emptystate from './Emptystate';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity, removeFromCart } from '../../store/slices/cartSlice';

const CartPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  console.log(cartItems);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleonIncrement = (id) => {
   console.log("after increment:", id);
   dispatch(incrementQuantity(id));
  };

  const handleonDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    alert('Checkout button clicked! Proceeding to the next step.');
  };

  return (
    <Container maxWidth='lg' sx={{ py: 2 }}>
      <Typography variant="h4" align='center' sx={{ fontWeight: 'bold', color: 'text.secondary', mb: 1 }}>
        Shopping Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Emptystate icon={<ProductionQuantityLimitsIcon />} title="Failed to fetch data.." message={"can't find any product..."} />
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
          </Grid>

         
          <Grid item xs={12} md={4} >
            <CartSummary items={cartItems} totalPrice={totalPrice} onCheckout={handleCheckout} />
          </Grid>
          
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
