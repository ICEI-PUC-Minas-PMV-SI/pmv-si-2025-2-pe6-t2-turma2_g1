import HistoricoPedidosPage from './pages/HistoricoPedidosPage';
import CarrinhoPage from './pages/CarrinhoPage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importa o CSS global
import './App.css';

// Importa os componentes de página e de navegação
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<Register />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/historico-pedidos" element={<HistoricoPedidosPage />} />
            <Route path="/carrinho" element={<CarrinhoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;