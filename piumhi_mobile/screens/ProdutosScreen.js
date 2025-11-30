import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Text, Button, Card, ActivityIndicator, Paragraph, useTheme, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Container from '../components/Container';

import { useCart } from '../context/CartContext';


const API_URL = 'http://35.222.189.84/api/v1/produtos';

const ProdutosScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

 
  const { addToCart } = useCart();

  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantities, setQuantities] = useState({});

  
  const fetchProdutos = async () => {
   
    setIsLoading(true);
    setError(null);
    setProdutos([]);

    try {
      const response = await axios.get(API_URL);

      if (response.status >= 200 && response.status < 300) {
        const dadosProdutos = response.data;

        if (Array.isArray(dadosProdutos)) {
          setProdutos(dadosProdutos);

          const initialQuantities = dadosProdutos.reduce((acc, produto) => {

            const key = String(produto.id || produto.nome);
            acc[key] = 1; 
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } else {
          setError('A resposta da API não é um formato de lista válido.');
        }

      } else {
        setError(`Erro ao carregar produtos: Status ${response.status}`);
      }

    } catch (err) {
      console.error("Erro na busca de produtos:", err.message);

      let errorMessage = 'Não foi possível conectar à API. Verifique sua conexão ou a URL do servidor.';
      if (err.response) {
        errorMessage = `Erro do servidor: ${err.response.status}. Verifique a API.`;
      }

      setError(errorMessage);

    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    fetchProdutos();
  }, []);

 
  const getKey = (item) => String(item.id || item.nome);

  const handleQuantityChange = (item, delta) => {
    const key = getKey(item);
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[key] || 1;
      const newQuantity = Math.max(1, currentQuantity + delta); 
      return {
        ...prevQuantities,
        [key]: newQuantity,
      };
    });
  };

 
  const handleAddToCart = (item) => {
    const key = getKey(item);
    const quantity = quantities[key] || 1; 
    if (quantity < 1) {
        Alert.alert("Erro", "A quantidade deve ser no mínimo 1.");
        return;
    }

   
    addToCart(item, quantity);

   
    Alert.alert("Adicionado!", `${quantity} unidade(s) de ${item.nome} foram adicionadas ao seu carrinho.`, [
      { text: "Continuar Comprando" },
      { text: "Ver Carrinho", onPress: () => navigation.navigate('CarrinhoCompras') },
    ]);
  };

  
  const renderItem = ({ item }) => {
    const key = getKey(item);
    const quantity = quantities[key] || 1; 

    return (
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Cover
          source={{
            uri: item.imagem || 'https://placehold.co/600x400/EADDFF/6750A4?text=Sem+Imagem'
          }}
        />

        <Card.Content style={{ marginTop: 10 }}>
          <Text variant="titleMedium">{item.nome}</Text>
          <Paragraph>R$ {item.preco ? Number(item.preco).toFixed(2) : '0.00'}</Paragraph>
          <Paragraph style={styles.descricao} numberOfLines={2}>
            {item.descricao || 'Sem descrição'}
          </Paragraph>
        </Card.Content>

        <Card.Actions style={styles.cardActions}>
 
            <View style={styles.quantityContainer}>
                <IconButton
                    icon="minus"
                    size={20}
                    onPress={() => handleQuantityChange(item, -1)}
                    disabled={quantity <= 1} 
                    containerColor={theme.colors.onSurfaceVariant}
                    iconColor={theme.colors.surface}
                />
                <Text variant="titleLarge" style={styles.quantityText}>{quantity}</Text>
                <IconButton
                    icon="plus"
                    size={20}
                    onPress={() => handleQuantityChange(item, 1)}
                    containerColor={theme.colors.onSurfaceVariant}
                    iconColor={theme.colors.surface}
                />
            </View>


            <Button
                mode="contained"
                onPress={() => handleAddToCart(item)}
                style={styles.buyButton}
            >
                Adicionar ({quantity})
            </Button>
        </Card.Actions>
      </Card>
    );
  };



  return (
    <Container>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={styles.title}>
          Nossos Produtos
        </Text>

        {isLoading ? (

          <View style={styles.centerContainer}>
            <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 10 }}>Buscando dados...</Text>
          </View>
        ) : error ? (
  
          <View style={styles.centerContainer}>
            <Text style={{ color: theme.colors.error, marginBottom: 10, textAlign: 'center' }}>
              {error}
            </Text>
            <Button mode="outlined" onPress={fetchProdutos}>Tentar Novamente</Button>
          </View>
        ) : (
          
          <FlatList
            data={produtos}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id || item.nome)}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.centerContainer}>
                <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
                  Nenhum produto encontrado.
                </Text>
              </View>
            }
          />
        )}

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Voltar para Home
        </Button>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.6,
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  descricao: {
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    marginTop: 16,
  },

  cardActions: {
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  buyButton: {
    marginLeft: 'auto', 
  }
});

export default ProdutosScreen;
