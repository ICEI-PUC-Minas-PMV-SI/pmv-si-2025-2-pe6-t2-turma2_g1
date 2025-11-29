import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Surface, useTheme, ActivityIndicator } from 'react-native-paper'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native'; // Importar do react-navigation

import Container from '../components/Container'; 

const HISTORICO_KEY = '@HistoricoPedidos';

const HistoricoPedidos = () => {
  const theme = useTheme();
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const carregarHistorico = async () => {
    setIsLoading(true);
    try {
      const historicoString = await AsyncStorage.getItem(HISTORICO_KEY);
      const historico = historicoString ? JSON.parse(historicoString) : [];
      setPedidos(historico);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarHistorico();
      return () => {};
    }, [])
  );

  const formatarData = (dataString) => {
    try {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR');
    } catch {
        return "Data Inválida";
    }
  };


  const renderPedido = ({ item }) => (
    <Surface style={[styles.pedidoItem, { backgroundColor: theme.colors.surfaceVariant }]} elevation={2}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.dataCompra}>
          Pedido em: {formatarData(item.dataCompra)}
        </Text>
      </View>
      
      <View style={styles.details}>
        <Text variant="bodyLarge">
          Itens Totais: {item.quantidadeItens}
        </Text>
        <Text variant="headlineSmall" style={styles.valorTotal}>
          Total: R$ {item.valorTotal ? item.valorTotal.toFixed(2) : '0.00'}
        </Text>
      </View>
      

      {item.itens && item.itens.length > 0 && (
          <View style={styles.itensContainer}>
              <Text variant="bodySmall" style={{ marginTop: 8, fontWeight: 'bold' }}>Produtos:</Text>
              {item.itens.map((produto, index) => (
                  <Text key={index} variant="bodySmall">
                      - {produto.nome || 'Produto'} (x{produto.quantidade})
                  </Text>
              ))}
          </View>
      )}

    </Surface>
  );

  return (
    <Container>
      <Surface style={[styles.heroSection, { backgroundColor: theme.colors.primaryContainer }]}>
        <Text variant="headlineMedium" style={styles.heroTitle}>Seu Histórico de Compras 📦</Text>
      </Surface>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
        </View>
      ) : pedidos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Nenhum pedido encontrado.
          </Text>
        </View>
      ) : (
        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPedido}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
    heroSection: { padding: 20, alignItems: 'center', marginBottom: 10, elevation: 2 },
    heroTitle: { fontWeight: 'bold', color: '#21005D' },
    listContainer: { paddingHorizontal: 16, paddingVertical: 10 },
    pedidoItem: {
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        paddingBottom: 8,
    },
    dataCompra: {
        fontWeight: '600',
    },
    status: {
        fontWeight: 'bold',
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    valorTotal: {
        fontWeight: 'bold',
        color: '#6750A4', 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    itensContainer: {
        marginTop: 10,
        paddingTop: 5,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    }
});

export default HistoricoPedidos;
