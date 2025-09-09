import './App.css';
import { Routes, Route, Navigate } from 'react-router'

// Pages Import
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';
import Home from "./pages/Home.js"



function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
