import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import './App.css';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/pedidos" element={<Orders />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Register />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;

