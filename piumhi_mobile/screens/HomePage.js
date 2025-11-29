import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Surface, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Container from '../components/Container';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const { isLoggedIn, signOut } = useAuth();

  const handleLogout = () => {
    signOut();

    navigation.navigate('Login');
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        <Surface
          style={[
            styles.heroSection,
            { backgroundColor: theme.colors.primaryContainer },
          ]}
        >
          <View style={styles.heroContent}>
            <Image
              source={require('../assets/logo_piumhi.png')}
              style={styles.logo}
            />
            <Text variant="headlineLarge" style={styles.heroTitle}>
              Tecnologia e Inovação ao seu Alcance
            </Text>
            <Text variant="bodyLarge" style={styles.heroSubtitle}>
              Explore nossa coleção de eletrônicos de última geração. Qualidade
              e performance que você pode confiar.
            </Text>

            <View style={styles.heroActions}>
              {!isLoggedIn ? (
                <>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('Registrar')}
                    style={styles.button}
                    icon={({ size, color }) => (
                      <Icon name="person-add" size={size} color={color} />
                    )}
                  >
                    Criar Conta
                  </Button>

                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('Login')}
                    style={styles.button}
                    icon={({ size, color }) => (
                      <Icon name="login" size={size} color={color} />
                    )}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Produtos')}
                    style={styles.button}
                    icon={({ size, color }) => (
                      <Icon name="shopping-cart" size={size} color={color} />
                    )}
                  >
                    Ver Produtos
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('CarrinhoCompras')}
                    style={styles.button}
                    icon={({ size, color }) => (
                      <Icon name="shopping-cart" size={size} color={color} />
                    )}
                  >
                    Carrinho de Compras
                  </Button>

                  <Button
                    mode="outlined"
                    onPress={() => navigation.navigate('HistoricoPedidos')}
                    style={styles.button}
                    icon={({ size, color }) => (
                      <Icon name="history" size={size} color={color} />
                    )}
                  >
                    Histórico de Pedidos
                  </Button>

                  <Button
                    mode="outlined"
                    onPress={handleLogout}
                    style={styles.button}
                    icon={({ size, color }) => (
                      <Icon name="logout" size={size} color={color} />
                    )}
                  >
                    Sair
                  </Button>
                </>
              )}
            </View>
          </View>
        </Surface>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    padding: 24,
    margin: 16,
    borderRadius: 12,
    elevation: 4,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
    opacity: 0.8,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  button: {
    minWidth: 140,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default HomePage;
