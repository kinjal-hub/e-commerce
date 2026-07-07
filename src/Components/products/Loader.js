import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'
const Loader = ({size, message}) => {
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '80vh',
      gap: 2,
      p: 2,
      mt: '8px'
    }}>
    <CircularProgress size={size} color='secondary' message={message}/>
       {message && (
        <Typography variant='body1' color='secondary'>
          {message}
        </Typography>
       )}
    </Box>
  )
}

export default Loader