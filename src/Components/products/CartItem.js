import React from 'react';
import { Box, CardMedia, CardContent, Typography, IconButton, Card } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item, onIncrement, onDecrement, onRemove }) => {
  const { id, name, price, image, quantity } = item;
  const subTotal = price * quantity;

  return (
    <Card sx={{ 
      p: { xs: 1.5, md: 2 }, 
      m: { xs: 1, md: 2 }, 
      maxWidth: 600, 
      mx: 'auto', 
      borderRadius: 2, 
      boxShadow: 3 
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
        <CardMedia
          component="img"
          image={image}
          sx={{ 
            width: { xs: 70, sm: 100, md: 120 }, 
            height: { xs: 70, sm: 100, md: 120 }, 
            borderRadius: 2, 
            objectFit: 'cover',
            flexShrink: 0 
          }}
        />

        <CardContent sx={{ 
          display: 'flex', 
          flex: 1, 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          justifyContent: 'space-between', 
          p: '0 !important', 
          gap: 1,
          overflow: 'hidden'
        }}>
          
          <Box sx={{ minWidth: 0, flex: 1 }}> 
            <Typography 
              variant="h6" 
              noWrap 
              sx={{ fontWeight: 'bold', fontSize: { xs: '0.9rem', md: '1.1rem' } }}
            >
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${price.toFixed(2)}
            </Typography>
          </Box>

          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            width: { xs: '100%', sm: 'auto' }, 
            gap: { xs: 1, sm: 2 },
            flexShrink: 0 
          }}>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton 
                onClick={() => onDecrement(id)} 
                size="small" 
                sx={{ border: '1px solid #ddd', p: 0.5 }} 
                disabled={quantity <= 1}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                {quantity}
              </Typography>
              <IconButton 
                onClick={() => onIncrement(id)} 
                size="small" 
                sx={{ border: '1px solid #ddd', p: 0.5 }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>

            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: '70px', textAlign: 'right' }}>
                ${subTotal.toFixed(2)}
              </Typography>
              <IconButton onClick={() => onRemove(id)} color="error" size="small">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CartItem;
