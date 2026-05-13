import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import Navbar from './Components/products/Navbar';
import Cart from './Components/products/Cart'
import CustomButton from './Components/products/CustomButton'
import ProductCard from './Components/products/ProductCard'
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { products } from './Utils/data';
import ProductDetail from './Components/products/ProductDetail'
import Loader from './Components/products/Loader'
import Emptystate from './Components/products/Emptystate'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';


function App() {
   const [ isLoading, setIsLoading ] = useState(false)
    const handleAddToCart = () => {
        setIsLoading(!isLoading);
    }

  return (
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
         <Navbar />
          <Routes>
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/' element={<ProductCard product = {products}/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/button' element={
            <CustomButton
            label='Add to Cart'
            onClick={handleAddToCart}
            variant='contained'
            loading={isLoading}
            startIcon={<ShoppingCartIcon />}
            color='secondary'
            fullWidth
            />} />
            <Route path='/Loader' element={<Loader  size={60} message='Loading...'/>} />
            <Route path='/Emptystate' element={<Emptystate icon={<ProductionQuantityLimitsIcon />}
            title="Failed to fetch data.."
            message={"can't find any product..."}
           />}  />
          </Routes>
      </ThemeProvider>
    </div>
    </Router>
  );
}

export default App;
