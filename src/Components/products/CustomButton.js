import { Button, Box } from '@mui/material';
const CustomButton = ({
  label,
  variant,
  color,
  onClick,
  loading,
  disabled,
  startIcon,
  endIcon,
  fullWidth }) => {
    
return (
    <Box sx={{ display:'flex', justifyContent:'center'}}>
        <Button
        label={label}
        loading={loading}
        disabled= {disabled}
        onClick={onClick}
        startIcon={startIcon}
        endIcon={endIcon}
        variant={variant}
        color = {color}
        fullWidth={fullWidth}
       >
           {label || "Loading"}
        </Button>
    </Box>
  )
}
export default CustomButton;
