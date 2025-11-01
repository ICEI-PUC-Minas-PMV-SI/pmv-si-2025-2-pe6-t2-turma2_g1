import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../services/authService";
import logo from "../assets/logo.png"; // ajuste caso o caminho seja diferente
import "../styles/Navbar.css"; // vamos criar CSS separado para estilos
import { useCart } from "../context/CartContext";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>

      <div className="navbar-right">
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        <ul className={`menu ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/">Página Inicial</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos</Link>
          </li>
          <li className="submenu">
            <span>Login</span>
            <ul className="dropdown">
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/registrar">Registrar</Link>
              </li>
              <li>
                <Link to="/carrinho">Carrinho ({cartItems.length})</Link>
              </li>
              <li>
                <Link to="/historico-pedidos">Histórico de Pedidos</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
