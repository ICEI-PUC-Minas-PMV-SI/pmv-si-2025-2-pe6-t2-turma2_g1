import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { products } from '../../data/products';
import { FiShoppingCart, FiMinus, FiPlus, FiTruck, FiShield, FiHeadphones, FiArrowLeft } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div className="page-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <FiArrowLeft />
              Voltar
            </button>
            <h1>Produto não encontrado</h1>
          </div>
          <div className="empty-state">
            <div className="empty-state-icon">❌</div>
            <h3>Produto não encontrado</h3>
            <p>O produto que você está procurando não existe ou foi removido.</p>
            <button className="btn btn-primary" onClick={() => navigate('/produtos')}>
              Ver Todos os Produtos
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Mostrar feedback visual (opcional)
    alert(`${quantity} ${product.name} adicionado(s) ao carrinho!`);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: 'Sem estoque', class: 'out-of-stock' };
    if (stock <= 5) return { text: 'Últimas unidades', class: 'low-stock' };
    return { text: 'Em estoque', class: 'in-stock' };
  };

  const stockStatus = getStockStatus(product.stock);

  // Simular múltiplas imagens
  const productImages = [
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="page-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            Voltar
          </button>
        </div>

        <div className="product-detail-content">
          <div className="product-images">
            <div className="main-image">
              <img 
                src={productImages[selectedImage]} 
                alt={product.name}
                className="product-main-image"
              />
            </div>
            <div className="image-thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info">
            <div className="product-header">
              <div className="product-category">{product.category}</div>
              <h1 className="product-name">{product.name}</h1>
              <p className="product-description">{product.description}</p>
            </div>

            <div className="product-price-section">
              <div className="price-container">
                <span className="current-price">{formatPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="original-price">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
              <div className={`stock-status ${stockStatus.class}`}>
                {stockStatus.text} ({product.stock} unidades)
              </div>
            </div>

            <div className="product-specifications">
              <h3>Especificações Técnicas</h3>
              <div className="specs-grid">
                {product.specs.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <span className="spec-label">{spec.label}:</span>
                    <span className="spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="product-features">
              <h3>Principais Características</h3>
              <ul className="features-list">
                {product.features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-actions">
              <div className="quantity-selector">
                <label>Quantidade:</label>
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <FiShoppingCart />
                {product.stock === 0 ? 'Sem estoque' : 'Adicionar ao Carrinho'}
              </button>
            </div>

            <div className="product-benefits">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FiTruck />
                </div>
                <div className="benefit-text">
                  <h4>Entrega Rápida</h4>
                  <p>Frete grátis para pedidos acima de R$ 200</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FiShield />
                </div>
                <div className="benefit-text">
                  <h4>Garantia Estendida</h4>
                  <p>2 anos de garantia em todos os produtos</p>
                </div>
              </div>
              
              <div className="benefit-item">
                <div className="benefit-icon">
                  <FiHeadphones />
                </div>
                <div className="benefit-text">
                  <h4>Suporte Técnico</h4>
                  <p>Suporte especializado para empresas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;


