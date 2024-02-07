import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import React,{useEffect} from 'react'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './Components/HomePage/HomePage';
import NavBar from './Components/NavBar/NavBar';
import Login from './Components/LoginRegisterPage/LoginPage/Login';
import Register from './Components/LoginRegisterPage/RegisterPage/Register';
import ProductListing from './Components/ProductListingPage/ProductListing';
import ProductDetailPage from './Components/ProductListingPage/ProductDetailPage';
import CartPage from './Components/CartPage/CartPage';
import ItemsOrderedPage from './Components/ItemsOrderedPage/ItemsOrderedPage';
import ProfilePage from './Components/UserProfile/ProfilePage';

function App() {


  return (
    <>
      <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' index element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/allproduct' element={<ProductListing />} />
          <Route path='/productdetail/:pid' element={<ProductDetailPage />} />
          <Route path='/cartitems' element={<CartPage />} />
          <Route path='/itemsordered' element={<ItemsOrderedPage/>} />
          <Route path='/profile' element={<ProfilePage/>} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
