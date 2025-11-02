import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

function ProductsPage() {
  // Estado para guardar a lista de produtos. Começa como um array vazio.
  const [products, setProducts] = useState([]);
  // Estado para saber se ainda estamos carregando os dados.
  const [loading, setLoading] = useState(true);
  // Estado para guardar qualquer erro que aconteça.
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // useEffect para buscar os dados da API quando o componente for montado.
  useEffect(() => {
    // Função assíncrona para buscar os produtos.
    const fetchProducts = async () => {
      try {
        // Faz a requisição GET para a API de produtos.
        const response = await axios.get('http://localhost:3000/api/v1/produtos');
        // Atualiza o estado com os dados recebidos.
        setProducts(response.data);
      } catch (err) {
        // Se der erro, atualiza o estado de erro.
        setError('Não foi possível carregar os produtos.');
        console.error(err);
      } finally {
        // Independentemente de sucesso ou erro, para de carregar.
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // O array vazio [] garante que este efeito rode apenas uma vez.

  // Se estiver carregando, mostra uma mensagem.
  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  // Se der erro, mostra uma mensagem de erro.
  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Se tudo deu certo, mostra a lista de produtos.
  return (
    <div>
      <h1>Página de Produtos</h1>
      {products.length > 0 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {products.map(product => (
            <div key={product.id || product._id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', width: '300px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <img 
                src={product.imagem} 
                alt={product.nome} 
                style={{ 
                  width: '100%', 
                  height: '200px', 
                  objectFit: 'cover', 
                  borderRadius: '4px',
                  marginBottom: '10px'
                }} 
              />
              <h3 style={{ fontSize: '1.2em', margin: '10px 0' }}>{product.nome}</h3>
              <p style={{ color: '#555', fontSize: '0.9em' }}>{product.descricao}</p>
              <p style={{ fontSize: '1.5em', fontWeight: 'bold', color: '#000' }}>
                R$ {product.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <button onClick={() => {alert(`${product.nome} foi adicionado ao carrinho!`); addToCart(product);}} style={{ marginTop: '10px', padding: '10px 20px', fontSize: '1em', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhum produto encontrado.</p>
      )}
    </div>
  );
}

export default ProductsPage;