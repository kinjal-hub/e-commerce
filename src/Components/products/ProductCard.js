import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Rating, Box, Chip, CardActions  } from '@mui/material'
import CustomButton from './CustomButton'
import {  useNavigate } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Grid container spacing={0.5} sx={{ mt:'10px', ml: { md:'68px', xs: '52px'} }} justifyContent='center' >
        {product.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} >
            <CardActions onClick={() => navigate(`/products/${item.id}`)}>
            <Card
             sx={{ 
              maxWidth: 250, 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              position: 'relative' 
            }}
            >
            
            {!item.inStock && (
                <Chip
                  label="Out of Stock"
                  color="text.secondary"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    zIndex: 1,
                    fontWeight: 'bold'
                  }}
                />
              )}
            <CardMedia
            component='img'
            height={250}
            image= {item.image?.trim() ? item.image : "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"}
            
            />
            
            <CardContent>
              <Typography sx={{ color: 'text.secondary', textAlign:'left', fontSize:'1.3rem', fontWeight:'Bold'}}>
                {item.name}
              </Typography>
               <Typography sx={{ color: 'text.secondary', textAlign:'left' }}>
                ${item.price}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
               <Typography sx={{ color: 'text.secondary' }}>
                {item.rating}
               </Typography>
                <Rating  
                  value={item.rating} 
                  precision={0.5} 
                  readOnly 
                  size='small'
                  sx={{ color:'text.secondary'}}
              />
            </Box>
               <Typography sx= {{ mt: '8px', display: 'flex', justifyContent: 'center'}}>
                <CustomButton label='Add To Cart' variant='contained'color='primary.dark'/>
              </Typography>
            
            </CardContent>
           
          </Card>
          </CardActions> 
          </Grid>
          
        ))
        }
      </Grid>
    </div>
  )
}

export default ProductCard
