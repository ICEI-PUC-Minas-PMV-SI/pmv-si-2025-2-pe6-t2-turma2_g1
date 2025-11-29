// src/contexts/CartContext.js

import React, { createContext, useState, useContext, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); 

  // --- FUNÇÃO CORRIGIDA: ACEITA QUANTIDADE ---
  // O segundo argumento 'quantity' é a quantidade que o usuário selecionou (p. ex., 3)
  const addToCart = (product, quantity = 1) => {
    // Garante que quantity seja um número (pode ser necessário se vier de input de texto)
    const newQuantity = parseInt(quantity, 10);
    
    // Verificação de segurança
    if (isNaN(newQuantity) || newQuantity <= 0) {
        console.error("Quantidade inválida recebida:", quantity);
        return;
    }
    
    setCartItems((currentItems) => {
      const productId = product.id || product._id; // Garante que usa 'id' ou '_id'
      const existingItem = currentItems.find(item => (item.id || item._id) === productId);

      if (existingItem) {
        // Se já existe, ACRESCENTA a nova quantidade
        return currentItems.map(item =>
          (item.id || item._id) === productId
            ? { ...item, quantidade: item.quantidade + newQuantity } // AQUI ESTÁ A CHAVE!
            : item
        );
      } else {
        // Se não existe, adiciona com a quantidade fornecida
        return [...currentItems, { ...product, quantidade: newQuantity }];
      }
    });
  };

  // Função para remover um item
  const removeFromCart = (productId) => {
    // Agora verifica tanto 'id' quanto '_id'
    setCartItems(currentItems =>
      currentItems.filter(item => (item.id || item._id) !== productId)
    );
  };

  // Cálculo do total (USANDO useMemo para otimizar)
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + ((item.preco || 0) * (item.quantidade || 0)), 
      0
    );
  }, [cartItems]);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, cartTotal, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);