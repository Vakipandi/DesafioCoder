import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import HomeScreen from './Pages/HomeScreen';
import Footer from './Components/Footer/Footer';
import Polos from './Components/Polos/Polos';
import Pantalones from './Components/Pantalones/Pantalones';
import Gorras from './Components/Gorras/Gorras';
import Zapatos from './Components/Zapatos/Zapatos';
import ContactanosScreen from './Pages/ContactanosScreen';
import SearchScreen from './Pages/SearchScreen';
import { CartProvider } from './Context/CartContext';
import CartScreen from './Pages/CartScreen';
import RegisterScreen from './Pages/RegisterScreen';
import LoginScreen from './Pages/LoginScreen';
import { AuthProvider } from './Context/AuthContext';
import { useState } from 'react';
import CheckoutScreen from './Pages/CheckoutScreen';
import StripeProvider from './Context/StripeProvider';
import Checkout from './Pages/Checkout';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <>
      <BrowserRouter>
        <StripeProvider>
          <AuthProvider>
            <CartProvider>
              <Navbar userInfo={userInfo} setUserInfo={setUserInfo} />
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/products" element={<HomeScreen />} />
                <Route path="/products/polos" element={<Polos />} />
                <Route path="/products/pantalones" element={<Pantalones />} />
                <Route path="/products/gorras" element={<Gorras />} />
                <Route path="/products/zapatos" element={<Zapatos />} />
                <Route path="/contactanos" element={<ContactanosScreen />} />
                <Route path="/search/:searchQuery" element={<SearchScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/auth/register" element={<RegisterScreen />} />
                <Route path="/auth/login" element={<LoginScreen />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </StripeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
