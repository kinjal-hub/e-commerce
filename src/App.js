import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from './theme/theme';
import Navbar from './Components/products/Navbar';
// import Cart from './Components/products/Cart'
import CustomButton from './Components/products/CustomButton'
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProductDetail from './Components/products/ProductDetail'
import Loader from './Components/products/Loader'
import Products from './pages/ProductPage';
import CartPage from './Components/products/CartPage'
import CartSummary from './Components/products/CartSummary';



function App() {
   const [ isLoading, setIsLoading ] = useState(false)
    const handleAddToCart = () => {
        setIsLoading(!isLoading);
    }

    const items = [
      { id: 1, name: "Wireless Bluetooth Headphones", price: 79.99, quantity: 2, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
      { id: 2, name: "Smart Watch Pro", price: 49.99, quantity: 1, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" }
  ];

  const handleCheckout = () => {
    alert('Checkout button clicked! Proceeding to the next step.');
  };
   
  return (
    <Router>
    <div className="App">
      <ThemeProvider theme={theme}>
         <Navbar />
          <Routes>
            <Route path='/products/:id' element={<ProductDetail />} />
            <Route path='/' element={<Products />} />
            <Route path='/cart' element={<CartPage />} />
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
            <Route path='/order' element={<CartSummary items={items} onCheckout={handleCheckout}/>}/>
          </Routes>
      </ThemeProvider>
    </div>
    </Router>
  );
}

export default App;
