import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Sem estoque', class: 'out-of-stock' };
    if (stock <= 5) return { text: 'Últimas unidades', class: 'low-stock' };
    return { text: 'Em estoque', class: 'in-stock' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="product-card">
      <Link to={`/produto/${product.id}`} className="product-link">
        <div className="product-image-container">
          <img 
            src={product.image || '/api/placeholder/300/200'} 
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
          <div className="product-overlay">
            <button className="overlay-button" title="Ver detalhes">
              <FiEye />
            </button>
          </div>
        </div>
        
        <div className="product-info">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          <div className="product-specs">
            {product.specs && product.specs.slice(0, 2).map((spec, index) => (
              <div key={index} className="spec-item">
                <span className="spec-label">{spec.label}:</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
          
          <div className="product-footer">
            <div className="product-price">
              <span className="price-current">{formatPrice(product.price)}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="price-original">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
            
            <div className={`stock-status ${stockStatus.class}`}>
              {stockStatus.text}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="product-actions">
        <button 
          className={`add-to-cart-btn ${product.stock === 0 ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <FiShoppingCart />
          {product.stock === 0 ? 'Sem estoque' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

