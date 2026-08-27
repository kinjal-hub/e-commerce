import { Box ,Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { hideNotification } from '../../store/slices/notificationSlice';
const NotificationSnackbar = () => {

  const dispatch = useDispatch();
  const { open, message, severity, id } = useSelector((state) => state.notification);



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(hideNotification())
  };

  return (
    <Box >
      <Snackbar
        key={id}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: '65px' }}

      >
        <Alert
          onClose={handleClose}
          severity={severity || 'info'}
          variant="standard"
          sx={{ width: '100%', backgroundColor: 'primary.main', color: 'error.contrastText' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default NotificationSnackbar