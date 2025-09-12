import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import './Cart.css';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useUser();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirecionar para login
      window.location.href = '/login';
      return;
    }
    // Implementar checkout
    console.log('Iniciando checkout...');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="page-header">
            <h1>Carrinho de Compras</h1>
          </div>
          
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FiShoppingBag />
            </div>
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione alguns produtos para começar sua compra</p>
            <Link to="/produtos" className="btn btn-primary">
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="page-header">
          <h1>Carrinho de Compras</h1>
          <p>{items.length} produto{items.length !== 1 ? 's' : ''} no carrinho</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{formatPrice(item.price)}</p>
                  <div className="item-stock">
                    {item.stock > 0 ? (
                      <span className="in-stock">Em estoque</span>
                    ) : (
                      <span className="out-of-stock">Sem estoque</span>
                    )}
                  </div>
                </div>

                <div className="item-quantity">
                  <label>Quantidade:</label>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>

                <div className="item-total">
                  <span className="total-label">Subtotal:</span>
                  <span className="total-value">{formatPrice(item.price * item.quantity)}</span>
                </div>

                <div className="item-actions">
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    title="Remover do carrinho"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Resumo do Pedido</h3>
              
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              
              <div className="summary-row">
                <span>Frete:</span>
                <span className="free-shipping">Grátis</span>
              </div>
              
              <div className="summary-row">
                <span>Desconto:</span>
                <span className="discount">-{formatPrice(0)}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>

              <div className="summary-actions">
                <button
                  className="btn btn-primary btn-large checkout-btn"
                  onClick={handleCheckout}
                >
                  Finalizar Compra
                  <FiArrowRight />
                </button>
                
                <button
                  className="btn btn-outline clear-cart-btn"
                  onClick={clearCart}
                >
                  Limpar Carrinho
                </button>
              </div>

              {!isAuthenticated && (
                <div className="login-prompt">
                  <p>Faça login para finalizar sua compra</p>
                  <Link to="/login" className="btn btn-outline">
                    Fazer Login
                  </Link>
                </div>
              )}
            </div>

            <div className="shipping-info">
              <h4>Informações de Entrega</h4>
              <ul>
                <li>✓ Frete grátis para pedidos acima de R$ 200</li>
                <li>✓ Entrega em até 24h para grandes centros</li>
                <li>✓ Rastreamento em tempo real</li>
                <li>✓ Entrega em múltiplos endereços</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;


