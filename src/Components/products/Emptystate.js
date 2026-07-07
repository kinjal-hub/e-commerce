import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Emptystate = ({icon, title, message, actionButton}) => {
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
      mt: '8px',
      textAlign: 'center',
    }}
    >
    <Stack spacing={2} alignItems='center'>
        <Box sx={{ color: 'text.secondary'}}>
            {icon}
        </Box>
        <Typography variant='h5'>
            {title}
        </Typography>
        <Typography variant='h5'>
            {message}
        </Typography>
    </Stack>
        
    </Box>
  )
}

export default Emptystate