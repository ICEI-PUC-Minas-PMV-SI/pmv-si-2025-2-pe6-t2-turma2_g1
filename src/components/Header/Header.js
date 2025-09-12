import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch, FiLogOut } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { getTotalItems } = useCart();
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">🖥️</span>
            <span className="logo-text">TechPeriféricos B2B</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FiSearch />
              </button>
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="nav-desktop">
            <Link to="/produtos" className="nav-link">
              Produtos
            </Link>
            <Link to="/pedidos" className="nav-link">
              Pedidos
            </Link>
          </nav>

          {/* User Actions */}
          <div className="user-actions">
            {/* Cart */}
            <Link to="/carrinho" className="cart-link">
              <FiShoppingCart />
              <span className="cart-count">{getTotalItems()}</span>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="user-menu">
                <button className="user-button" onClick={toggleUserMenu}>
                  <FiUser />
                  <span className="user-name">{user?.name || 'Usuário'}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <div className="user-info">
                      <p className="user-email">{user?.email}</p>
                      <p className="user-company">{user?.company}</p>
                    </div>
                    <div className="user-dropdown-divider"></div>
                    <Link to="/pedidos" className="dropdown-link" onClick={() => setIsUserMenuOpen(false)}>
                      Meus Pedidos
                    </Link>
                    <button className="dropdown-link logout-button" onClick={handleLogout}>
                      <FiLogOut />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-outline">
                  Entrar
                </Link>
                <Link to="/cadastro" className="btn btn-primary">
                  Cadastrar
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="mobile-menu-button" onClick={toggleMenu}>
              {isMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <form className="search-form-mobile" onSubmit={handleSearch}>
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <FiSearch />
                </button>
              </div>
            </form>

            <nav className="nav-mobile">
              <Link to="/produtos" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Produtos
              </Link>
              <Link to="/pedidos" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                Pedidos
              </Link>
            </nav>

            {!isAuthenticated && (
              <div className="auth-buttons-mobile">
                <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>
                  Entrar
                </Link>
                <Link to="/cadastro" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

