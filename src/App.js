import './App.css';
import { Routes, Route, Navigate } from 'react-router'

// Pages Import
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from "./pages/Home.js"
import About from "./pages/About.js"



function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      <Footer />
    </>
  );
} 

export default App;
``