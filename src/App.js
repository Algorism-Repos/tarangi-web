import './App.css';
import { Routes, Route, Navigate } from 'react-router'

// Pages Import
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from "./pages/Home.js"
import About from "./pages/About.js"
import Product_page from './pages/Product_page.js';
import Product_Description from './pages/Product_Description.js';
import Favourites from './pages/Favourites.js'
import Checkout from './pages/Checkout.js'
import Profile from './pages/Profile.js';
import Error from './pages/Error.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Blog from './pages/Blog.js';
import Terms_Condition from './pages/Terms_Condition.js';
import Privacy_Policy from './pages/Privacy_Policy.js';
import Blog_Description from './pages/Blog_Description.js';


import ThankYou from './pages/Thank_you.js';
import Cart from './pages/Cart.js'

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Product_page />} />
          <Route path='/productdescription' element={<Product_Description />} />
          <Route path='/favourites' element={<Favourites />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thankyou' element={<ThankYou />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<Error />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms" element={<Terms_Condition/>}/>
          <Route path='/privacy' element={<Privacy_Policy />}/>
          <Route path='/blogdescription' element={<Blog_Description />} />
        </Routes>
      <Footer />
    </>
  );
} 

export default App;
