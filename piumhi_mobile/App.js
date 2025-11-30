import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { StatusBar } from 'react-native';
import { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from './context/CartContext';
// import NavigationStack from './NavigationStack'; 


import HomePage from './screens/HomePage';
import ProdutosScreen from './screens/ProdutosScreen';
import RegistrarScreen from './screens/RegistrarScreen';
import LoginScreen from './screens/Login';
import CarrinhoCompras from './screens/CarrinhoCompras';
import Usuario from './screens/Usuario';
import HistoricoPedidos from './screens/HistoricoPedidos';


const Stack = createStackNavigator();

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6750A4',
    primaryContainer: '#EADDFF',
    secondary: '#625B71',
    secondaryContainer: '#E8DEF8',
    surface: '#FFFBFE',
    surfaceVariant: '#E7E0EC',
    background: '#FFFBFE',
  },
};

export default function App() {
  return (
   <AuthProvider>
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <CartProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomePage}
            options={{
              title: 'Piumhi',
              headerShown: false, 
            }}
          />
          <Stack.Screen 
            name="Produtos" 
            component={ProdutosScreen}
            options={{
              title: 'Nossos Produtos',
              headerBackTitle: 'Voltar',
            }}
          />
          <Stack.Screen 
            name="Registrar" 
            component={RegistrarScreen}
            options={{
              title: 'Criar Conta',
              headerBackTitle: 'Voltar',
            }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              title: 'Login',
              headerBackTitle: 'Voltar',
            }}
          /> 
          <Stack.Screen 
            name="CarrinhoCompras" 
            component={CarrinhoCompras}
            options={{
              title: 'Carrinho de Compras',
              headerBackTitle: 'Voltar',
            }}
          /> 
          <Stack.Screen 
            name="HistoricoPedidos" 
            component={HistoricoPedidos}
            options={{
              title: 'Histórico de Pedidos',
              headerBackTitle: 'Voltar',
            }}
          /> 
        </Stack.Navigator>
      </NavigationContainer>
      </CartProvider>
    </PaperProvider>
  </AuthProvider>
  );
}