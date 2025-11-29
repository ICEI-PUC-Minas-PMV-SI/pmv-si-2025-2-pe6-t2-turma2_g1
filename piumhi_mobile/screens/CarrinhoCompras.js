import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';

import { Text, Button, Surface, useTheme } from 'react-native-paper'; 
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Container from '../components/Container';

import { useCart } from '../context/CartContext'; 

const API_BASE = 'http://35.222.189.84/api/v1';
const PEDIDOS_API_URL = `${API_BASE}/pedidos`; 
const USUARIOS_API_URL = `${API_BASE}/usuarios`;
const HISTORICO_KEY = '@HistoricoPedidos'; // <-- CHAVE PARA O ASYNCSTORAGE

const CarrinhoCompras = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  

  const { cartItems, cartTotal, removeFromCart, setCartItems } = useCart(); 
  const [isProcessing, setIsProcessing] = useState(false);


  const buscarUsuarioCompleto = async (email, token) => {
    try {

      const response = await axios.get(USUARIOS_API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const usuarioEncontrado = response.data.find(u => u.email === email);
      return usuarioEncontrado;
    } catch (error) {
      console.log("Erro ao buscar usuário completo:", error);
      return null;
    }
  };

  // --- NOVO: Função para salvar o pedido no histórico local ---
  const adicionarPedidoAoHistorico = async (novoPedido) => {
    try {
      // 1. Buscar o histórico existente
      const historicoString = await AsyncStorage.getItem(HISTORICO_KEY);
      
      // 2. Converter para objeto (ou iniciar array vazio)
      let historico = historicoString ? JSON.parse(historicoString) : [];

      // 3. Adicionar o novo pedido ao início do array (para aparecer primeiro)
      historico.unshift(novoPedido);

      // 4. Salvar o array de volta no AsyncStorage
      await AsyncStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));

    } catch (error) {
      console.log("Erro ao salvar histórico no AsyncStorage:", error);
    }
  };
  // -----------------------------------------------------------


  const handleFinalizarCompra = async () => {
    if (cartItems.length === 0) {
      Alert.alert('Carrinho Vazio', 'Adicione itens antes de finalizar.');
      return;
    }
    
    setIsProcessing(true);

    try {

        let usuarioString = await AsyncStorage.getItem('usuario');
        const token = await AsyncStorage.getItem('token');
        
        if (!usuarioString || !token) {
            Alert.alert("Login Necessário", "Faça login novamente.");
            navigation.navigate("Login");
            setIsProcessing(false);
            return;
        }
        
        let usuarioId = null;
        let usuarioObjeto = null;

        try {
            usuarioObjeto = JSON.parse(usuarioString);
            if (typeof usuarioObjeto === 'string') {
                const userFull = await buscarUsuarioCompleto(usuarioObjeto, token);
                if (userFull) {
                    usuarioId = userFull.id || userFull._id;
                    usuarioObjeto = userFull;
                    await AsyncStorage.setItem('usuario', JSON.stringify(userFull));
                }
            } else {
                usuarioId = usuarioObjeto.id || usuarioObjeto._id;
            }
        } catch (e) {
            const userFull = await buscarUsuarioCompleto(usuarioString, token);
            if (userFull) {
                usuarioId = userFull.id || userFull._id;
                usuarioObjeto = userFull;
                await AsyncStorage.setItem('usuario', JSON.stringify(userFull));
            }
        }

        if (!usuarioId) {
            Alert.alert("Erro Fatal", "Não foi possível identificar seu usuário. Por favor, faça Logout e Login novamente.");
            setIsProcessing(false);
            return;
        }

      const itensFormatados = cartItems.map(item => ({
         quantidade: item.quantidade,
         produto: item.id || item._id || item.produtoId 
      }));

      if (itensFormatados.some(i => !i.produto)) {
         Alert.alert("Erro", "Produto inválido no carrinho. Remova e adicione novamente.");
         setIsProcessing(false);
         return;
      }

  
      const pedidoData = {
        itensPedido: itensFormatados,
        usuario: usuarioId, 

        enderecoEntrega1: usuarioObjeto.rua || "Endereço não informado", 
        enderecoEntrega2: usuarioObjeto.apartamento || "", 
        cidade: usuarioObjeto.cidade || "Cidade não informada",
        cep: usuarioObjeto.cep || "00000-000",
        estado: usuarioObjeto.estado || "XX",
        telefone: usuarioObjeto.telefone || "000000000",
        status: "Pendente"
      };

      const config = {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      };

      // 1. Envio para a API e captura da resposta
      const response = await axios.post(PEDIDOS_API_URL, pedidoData, config);
      const pedidoRegistrado = response.data; // Assumindo que a API retorna o objeto do pedido criado


      // --- NOVO: Montar e salvar o resumo do pedido no AsyncStorage ---
      const resumoPedido = {
        id: pedidoRegistrado._id || pedidoRegistrado.id || Date.now(), // Use o ID da API
        dataCompra: new Date().toISOString(), 
        valorTotal: cartTotal, 
        quantidadeItens: cartItems.reduce((acc, item) => acc + item.quantidade, 0),
        status: pedidoRegistrado.status || "Pendente",
        // Salva detalhes dos itens para exibição no histórico
        itens: cartItems.map(item => ({ nome: item.nome, quantidade: item.quantidade, precoUnitario: item.preco })),
      };

      await adicionarPedidoAoHistorico(resumoPedido);
      // -------------------------------------------------------------------


      // 2. Limpar e notificar
      setCartItems([]); 
      Alert.alert('Sucesso Total!', 'Pedido realizado!',
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );

    } catch (error) {
      console.error("ERRO:", error);
      const msg = error.response ? JSON.stringify(error.response.data) : error.message;
      Alert.alert("Não foi possível finalizar", msg);
    } finally {
      setIsProcessing(false);
    }
  };


  const renderCartItem = (item) => {
//... (Resto do código do renderCartItem e styles permanece o mesmo)
    const uniqueId = item.id || item._id; 

    return (
      <Surface 
        key={uniqueId || Math.random()} 
        style={[styles.cartItem, { backgroundColor: theme.colors.surface }]}
      >
        <View style={styles.itemDetails}>
          <Text variant="titleMedium">{item.nome || 'Produto'}</Text>
          

          <Text variant="bodyMedium" style={styles.quantityDisplay}>
                Quantidade: <Text style={{ fontWeight: 'bold' }}>{item.quantidade}</Text>
            </Text>
          
          <Text variant="bodyLarge" style={styles.itemPrice}>
            Subtotal: R$ {((item.preco || 0) * item.quantidade).toFixed(2)}
          </Text>
        </View>
        
        <Button 
          onPress={() => removeFromCart(uniqueId)} 
          icon="delete" 
          mode="text" 
          compact
          textColor={theme.colors.error}
        >
          Remover
        </Button>
      </Surface>
    );
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        <Surface style={[styles.heroSection, { backgroundColor: theme.colors.primaryContainer }]}>
          <Text variant="headlineMedium" style={styles.heroTitle}>Seu Carrinho</Text>
        </Surface>

        <View style={styles.listContainer}>
          {cartItems.length > 0 ? (
            cartItems.map(renderCartItem)
          ) : (
            <Text style={styles.emptyCartText}>O carrinho está vazio.</Text>
          )}
        </View>

        <Surface style={[styles.totalSection, { backgroundColor: theme.colors.surface }]}>
          <Text variant="titleLarge">Total:</Text>
          <Text variant="headlineMedium" style={styles.totalValue}>R$ {cartTotal.toFixed(2)}</Text>
        </Surface>

        <View style={styles.finalizarContainer}>
          <Button
            mode="contained"
            onPress={handleFinalizarCompra}
            style={styles.button}
            loading={isProcessing}
            disabled={cartItems.length === 0 || isProcessing}
          >
            Finalizar Compra
          </Button>
          
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Produtos')} 
            style={[styles.button, styles.backButton]}
            disabled={isProcessing}
          >
            Continuar Comprando
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: { paddingHorizontal: 16, paddingVertical: 10 },
  heroSection: { padding: 20, alignItems: 'center', marginBottom: 10, elevation: 2 },
  heroTitle: { fontWeight: 'bold', color: '#21005D' },
  cartItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, marginBottom: 12, borderRadius: 12, elevation: 2 },
  itemDetails: { flex: 1 },
  itemPrice: { fontWeight: 'bold', marginTop: 8, color: '#2E7D32' },
  totalSection: { margin: 16, padding: 24, borderRadius: 16, alignItems: 'center', elevation: 4, borderWidth: 1, borderColor: '#E0E0E0' },
  totalValue: { marginTop: 8, fontWeight: 'bold', color: '#6750A4' },
  finalizarContainer: { paddingHorizontal: 16, paddingBottom: 40, marginTop: 10, alignItems: 'center' },
  button: { minWidth: '100%', marginBottom: 12, borderRadius: 8, paddingVertical: 6 },
  backButton: { borderColor: '#6750A4' },
  emptyCartText: { textAlign: 'center', paddingVertical: 60, fontSize: 18, opacity: 0.5 },


  quantityDisplay: {
    marginTop: 4,
    marginBottom: 8,
  }
});

export default CarrinhoCompras;
