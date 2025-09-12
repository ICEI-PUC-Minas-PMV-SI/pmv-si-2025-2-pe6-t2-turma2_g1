import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiEye } from 'react-icons/fi';
import './Orders.css';

const Orders = () => {
  const { user, isAuthenticated } = useUser();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dados mockados de pedidos
  const orders = [
    {
      id: 'PED-2024-001',
      date: '2024-01-15',
      status: 'entregue',
      total: 1299.80,
      items: [
        { name: 'Mouse Óptico Profissional MX Master 3', quantity: 2, price: 299.90 },
        { name: 'Teclado Sem Fio Compacto', quantity: 1, price: 159.90 },
        { name: 'Headset Bluetooth Profissional', quantity: 1, price: 399.90 }
      ],
      shipping: {
        address: 'Rua das Flores, 123 - São Paulo/SP',
        tracking: 'BR123456789SP'
      }
    },
    {
      id: 'PED-2024-002',
      date: '2024-01-20',
      status: 'em_transito',
      total: 899.90,
      items: [
        { name: 'Teclado Mecânico RGB K95 Platinum', quantity: 1, price: 899.90 }
      ],
      shipping: {
        address: 'Av. Paulista, 1000 - São Paulo/SP',
        tracking: 'BR987654321SP'
      }
    },
    {
      id: 'PED-2024-003',
      date: '2024-01-25',
      status: 'processando',
      total: 489.80,
      items: [
        { name: 'Mouse Pad Gaming XXL', quantity: 2, price: 89.90 },
        { name: 'Adaptador USB-C Hub 7 em 1', quantity: 1, price: 199.90 },
        { name: 'Mouse Vertical Ergonômico', quantity: 1, price: 229.90 }
      ],
      shipping: {
        address: 'Rua Augusta, 456 - São Paulo/SP',
        tracking: null
      }
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'processando':
        return {
          label: 'Processando',
          icon: FiClock,
          color: '#f59e0b',
          bgColor: '#fef3c7'
        };
      case 'em_transito':
        return {
          label: 'Em Trânsito',
          icon: FiTruck,
          color: '#3b82f6',
          bgColor: '#dbeafe'
        };
      case 'entregue':
        return {
          label: 'Entregue',
          icon: FiCheckCircle,
          color: '#10b981',
          bgColor: '#d1fae5'
        };
      default:
        return {
          label: 'Desconhecido',
          icon: FiPackage,
          color: '#6b7280',
          bgColor: '#f3f4f6'
        };
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="page-header">
            <h1>Meus Pedidos</h1>
            <p>Faça login para visualizar seus pedidos</p>
          </div>
          <div className="empty-state">
            <div className="empty-state-icon">🔒</div>
            <h3>Acesso restrito</h3>
            <p>Você precisa estar logado para visualizar seus pedidos</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>Meus Pedidos</h1>
          <p>Acompanhe o status dos seus pedidos corporativos</p>
        </div>

        <div className="orders-content">
          <div className="orders-list">
            {orders.map(order => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div className="order-info">
                      <h3 className="order-id">{order.id}</h3>
                      <p className="order-date">Pedido em {formatDate(order.date)}</p>
                    </div>
                    <div className="order-status">
                      <div 
                        className="status-badge"
                        style={{ 
                          backgroundColor: statusInfo.bgColor,
                          color: statusInfo.color 
                        }}
                      >
                        <StatusIcon />
                        {statusInfo.label}
                      </div>
                    </div>
                  </div>

                  <div className="order-items">
                    <h4>Itens do pedido:</h4>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index} className="order-item">
                          <span className="item-quantity">{item.quantity}x</span>
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">{formatPrice(item.price)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-footer">
                    <div className="order-total">
                      <span>Total: <strong>{formatPrice(order.total)}</strong></span>
                    </div>
                    <div className="order-actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <FiEye />
                        Ver Detalhes
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {orders.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3>Nenhum pedido encontrado</h3>
              <p>Você ainda não fez nenhum pedido</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de detalhes do pedido */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalhes do Pedido {selectedOrder.id}</h2>
              <button 
                className="modal-close"
                onClick={() => setSelectedOrder(null)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="order-details">
                <div className="detail-section">
                  <h3>Informações do Pedido</h3>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <span className="detail-label">Data do pedido:</span>
                      <span className="detail-value">{formatDate(selectedOrder.date)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className="detail-value">
                        {getStatusInfo(selectedOrder.status).label}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Total:</span>
                      <span className="detail-value">{formatPrice(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <h3>Endereço de Entrega</h3>
                  <p>{selectedOrder.shipping.address}</p>
                  {selectedOrder.shipping.tracking && (
                    <p>
                      <strong>Código de rastreamento:</strong> {selectedOrder.shipping.tracking}
                    </p>
                  )}
                </div>

                <div className="detail-section">
                  <h3>Itens do Pedido</h3>
                  <div className="items-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Quantidade</th>
                          <th>Preço Unit.</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{formatPrice(item.price)}</td>
                            <td>{formatPrice(item.price * item.quantity)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan="3"><strong>Total:</strong></td>
                          <td><strong>{formatPrice(selectedOrder.total)}</strong></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;


