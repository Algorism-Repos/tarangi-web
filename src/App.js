import './App.css';
import { Routes, Route, Navigate } from 'react-router'

// Pages Import
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from "./pages/Home.js"
import About from "./pages/About.js"


import ThankYou from './pages/Thank_you.js';
import Cart from './pages/Cart.js'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/*" element={<Navigate to="/home" />} />
          
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Product_page />} />
          <Route path='/productdescription' element={<Product_Description />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment' element={<Payment/>} />
          <Route path='/thankyou' element={<ThankYou />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      <Footer />
    </>
  );
} 

export default App;
