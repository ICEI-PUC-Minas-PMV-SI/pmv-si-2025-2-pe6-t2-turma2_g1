import React, { useContext } from "react";
import { api } from "../services/api";
import "../styles/Carrinho.css";
import { useCart } from "../context/CartContext";
import { getCurrentUser } from "../services/authService";

function CarrinhoPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const finalizarPedido = async () => {
    const user = getCurrentUser();

    if (!user) {
      const entrarMesmoAssim = window.confirm(
        "Você não está logado. Quer finalizar o pedido mesmo assim?"
      );
      if (!entrarMesmoAssim) return;
    }

    const pedido = {
      itensPedido: cartItems.map(item => ({
        produto: item.id,
        quantidade: item.quantidade,
      })),
      enderecoEntrega1: "Rua das Flores, 123",
      enderecoEntrega2: "Apto 201",
      cidade: "Belo Horizonte",
      estado: "MG",
      cep: "30466782",
      telefone: user?.telefone || "333333333",
      status: "pendente",
      usuario: user?.id || null,
    };

        try {
      const response = await api.post("/pedidos", pedido);

      // A verificação de !response.ok não é idiomática com axios, 
      // pois ele já lança um erro para status >= 400.
      // A resposta de sucesso já vem em response.data.
      const data = response.data;
      alert(`✅ Pedido criado com sucesso! ID: ${data._id || data.id}`);

      clearCart(); // limpa o carrinho
    } catch (err) {
      console.error(err);
      alert("❌ Falha ao finalizar o pedido.");
    }
  };

  return (
    <div className="carrinho-container">
      <div className="carrinho-content">
        <h1 className="carrinho-title">Carrinho de Compras</h1>

        {cartItems.length === 0 ? (
          <p className="carrinho-vazio">Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="carrinho-itens">
              {cartItems.map((item) => (
                <div key={item.id} className="carrinho-item">
                  <div>
                    <h3>{item.nome}</h3>
                    <p>Preço: R$ {item.preco.toFixed(2)}</p>
                    <p>Quantidade: {item.quantidade}</p>
                  </div>
                  <button
                    className="btn-remover"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>

            <div className="carrinho-total">
              <h3>Total: <span>R$ {total.toFixed(2)}</span></h3>
            </div>

            <button onClick={finalizarPedido} className="btn-finalizar">
              Finalizar Pedido
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CarrinhoPage;
