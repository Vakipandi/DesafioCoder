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

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/products" element={<HomeScreen />} />
          <Route path="/products/polos" element={<Polos />} />
          <Route path="/products/pantalones" element={<Pantalones />} />
          <Route path="/products/gorras" element={<Gorras />} />
          <Route path="/products/zapatos" element={<Zapatos />} />
          <Route path="/contactanos" element={<ContactanosScreen />} />
          <Route path="/search/:searchQuery" element={<SearchScreen />} />
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
