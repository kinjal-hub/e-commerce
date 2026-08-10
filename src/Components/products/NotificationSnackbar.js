import { Snackbar, Alert } from '@mui/material';
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
    <div>
    
      <Snackbar
        key={id}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
      >
        <Alert 
        onClose={handleClose} 
        severity={severity} 
        variant="filled" 
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
      </Snackbar>
    </div>
  )
}

export default NotificationSnackbar