import React, { useEffect, useState } from "react";
import "../styles/HistoricoPedidos.css";
import { getCurrentUser } from "../services/authService";
import { api } from "../services/api";

function HistoricoPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      const continuar = window.confirm(
        "Você não está logado. Deseja acessar o histórico mesmo assim?"
      );
      if (!continuar) {
        setLoading(false);
        return;
      }
    }

    const fetchPedidos = async () => {
      try {
        const url = user
          ? `/pedidos/get/pedidosUsuario/${user.id}`
          : `/pedidos`;
        const response = await api.get(url);
        setPedidos(response.data);
      } catch (err) {
        console.error(err);
        setPedidos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <p className="loading-text">Carregando pedidos...</p>;
  if (pedidos.length === 0)
    return <p className="empty-message">Nenhum pedido encontrado.</p>;

  return (
    <div className="historico-container">
      <h1 className="historico-title">Histórico de Pedidos</h1>
      <div className="historico-grid">
        {pedidos.map((pedido) => (
          <div key={pedido._id} className="pedido-card">
            <h3>Pedido ID: {pedido._id}</h3>
            <p>Status: <strong>{pedido.status}</strong></p>
            <p>Data: {pedido.dataPedido ? new Date(pedido.dataPedido).toLocaleDateString() : "—"}</p>
            <p>Total: R$ {pedido.precoTotal ? pedido.precoTotal.toFixed(2) : "0.00"}</p>
            <div className="pedido-itens">
              {(pedido.itensPedido || []).map((item, idx) => (
                <div key={idx} className="pedido-item">
                  <p>
                    {item.produto.nome || "Produto"} x {item.quantidade || 0} — R${" "}
                    {(item.produto.preco || 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoricoPedidosPage;