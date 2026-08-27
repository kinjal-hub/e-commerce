import React from 'react'
import { Card, CardContent, Box, Typography, Stack, Divider, Button } from '@mui/material';
const CartSummary = ({items, onCheckout }) => {
const subTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const isFreeShipping = subTotal >= 100;
const shippingCost = subTotal === 0 ? 0 : (isFreeShipping ? 0 : 5);
const Tax = subTotal * 0.10;
const Total = subTotal + shippingCost + Tax;

  return (
    <Box sx={{ display:'flex', justifyContent:'center', flexGrow: 1, mt:'25px'}}>
    <Card  sx={{ width:{ xs:'100%', sm: 400, md: 450 } , borderRadius:2, boxShadow: 1 }}>
       <CardContent sx ={{ py: 3}}>
            <Typography variant='h6' color='text.secondary' align='center' sx={{ fontWeight: 'bold'}}>
                Order Summary
            </Typography>
            <Stack spacing={2} sx={{ my: 3 }}>
                <Box display='flex' justifyContent='space-between'>
                    <Typography color='text.secondary' sx={{ fontWeight: 'bold'}}>Subtotal</Typography>
                    <Typography fontWeight='medium'>${subTotal.toFixed(2)}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                   <Typography color='text.secondary' sx={{ fontWeight: 'bold'}}>Shipping</Typography>
                     <Box textAlign="right">
                   <Typography fontWeight='medium'>
                     {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                   </Typography>
                     {isFreeShipping && subTotal > 0 && (
                   <Typography variant='caption' color='success.main' display='block'>
                      Free shipping applied!
                   </Typography>
                     )}
                   {!isFreeShipping && subTotal > 0 && (
                   <Typography variant='caption' color='text.secondary' display='block'>
                     Add {(100 - subTotal).toFixed(2)} more for Free Shipping
                   </Typography>
              )}
            </Box>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Typography color='text.secondary' sx={{ fontWeight: 'bold'}}>Estimated Tax (10%)</Typography>
            <Typography fontWeight='medium'>${Tax.toFixed(2)}</Typography>
          </Box>

          <Divider />

          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='subtitle1' sx={{fontWeight: 'bold'}}>Total</Typography>
            <Typography variant='h6' fontWeight='bold' color='primary.main'>
               ${Total.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
          <Button 
          variant='contained' 
          color='primary' 
          fullWidth 
          onClick={onCheckout}
          sx={{ py: 1.5, borderRadius: 2, fontWeight: 'bold' }}
        >
          Proceed to Checkout
        </ Button>

       </CardContent>
    </Card>
     </Box>
  )
}

export default CartSummary