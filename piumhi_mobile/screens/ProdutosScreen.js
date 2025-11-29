// import React from 'react';
// import { View, StyleSheet, ScrollView, Image } from 'react-native';
// import { Text, Button, Surface, useTheme } from 'react-native-paper';
// import { useNavigation } from '@react-navigation/native';
// import Container from '../components/Container'; 
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';

// const Usuario = () =>{
//   const navigation = useNavigation();
//   const theme = useTheme();

  
//   // 1. OBTENHA O ESTADO DE LOGIN E A FUNÇÃO DE LOGOUT
//   const { isLoggedIn, signOut } = useAuth();

//   // Função para navegação e logout (caso deseje um botão de Sair)
//   const handleLogout = () => {
//     signOut();
//     // Opcional: navegar para a tela de login ou resetar o stack
//     navigation.navigate('Login'); 
//   };

//   return (
//     <Container>
//       <ScrollView style={styles.container}>
//         <Surface style={[styles.heroSection, { backgroundColor: theme.colors.primaryContainer }]}>
//           <View style={styles.heroContent}>
//             <Image
//             source={require('../assets/logo_piumhi.png')} // <-- Ajuste o caminho se necessário
//             style={styles.logo}
//           />
//             <Text variant="headlineLarge" style={styles.heroTitle}>
//               Veja aqui seus dados de usuario
//             </Text>
//             <Text variant="bodyLarge" style={styles.heroSubtitle}>
//               Explore nossa coleção de eletrônicos de última geração. Qualidade e performance que você pode confiar.
//             </Text>
            
//             <View style={styles.heroActions}>
              
//               {/* Botão 1: VER PRODUTOS (Sempre visível) */}
//               <Button
//                 mode="contained"
//                 onPress={() => navigation.navigate('Produtos')}
//                 style={styles.button}
//                 icon={({ size, color }) => (
//                   <Icon name="shopping-cart" size={size} color={color} />
//                 )}
//               >
//                 Ver Produtos
//               </Button>
              
//               {/* ------------------------------------------- */}
//               {/* 2. OPÇÕES PARA USUÁRIO DESLOGADO (Login/Cadastro) */}
//               {/* ------------------------------------------- */}
//               {!isLoggedIn ? (
//                 <>
//                   <Button
//                     mode="outlined"
//                     onPress={() => navigation.navigate('Registrar')}
//                     style={styles.button}
//                     icon={({ size, color }) => (
//                       <Icon name="person-add" size={size} color={color} />
//                     )}
//                   >
//                     Criar Conta
//                   </Button>
    
//                   <Button
//                     mode="outlined"
//                     onPress={() => navigation.navigate('Login')}
//                     style={styles.button}
//                     icon={({ size, color }) => (
//                       <Icon name="login" size={size} color={color} /> 
//                     )}
//                   >
//                     Login
//                   </Button>
//                 </>
//               ) : (
//                 /* ------------------------------------------- */
//                 /* 3. OPÇÕES PARA USUÁRIO LOGADO (Carrinho/Histórico) */
//                 /* ------------------------------------------- */
//                 <>
//                   <Button
//                     mode="outlined"
//                     onPress={() => navigation.navigate('CarrinhoCompras')}
//                     style={styles.button}
//                     icon={({ size, color }) => (
//                       <Icon name="shopping-cart" size={size} color={color} />
//                     )}
//                   >
//                     Carrinho de Compras
//                   </Button>
    
//                   <Button
//                     mode="outlined"
//                     onPress={() => navigation.navigate('HistoricoPedidos')}
//                     style={styles.button}
//                     icon={({ size, color }) => (
//                       <Icon name="history" size={size} color={color} />
//                     )}
//                   >
//                     Histórico de Pedidos
//                   </Button>
                  
//                   {/* Sugestão: Botão de Sair/Logout */}
//                   <Button
//                     mode="outlined"
//                     onPress={handleLogout}
//                     style={styles.button}
//                     icon={({ size, color }) => (
//                       <Icon name="logout" size={size} color={color} />
//                     )}
//                   >
//                     Sair
//                   </Button>
//                 </>
//               )}
//             </View>
//           </View>
//         </Surface>
//         {/* ... (Resto da ScrollView/Conteúdo da página) ... */}
//       </ScrollView>
//     </Container>
//   );
// };

// const styles = StyleSheet.create({ // <-- Objeto styles deve ser definido aqui
//   container: {
//     flex: 1,
//   },
//   heroSection: {
//     padding: 24,
//     margin: 16,
//     borderRadius: 12,
//     elevation: 4,
//   },
//   heroContent: {
//     alignItems: 'center',
//   },
//   heroTitle: {
//     textAlign: 'center',
//     marginBottom: 16,
//     fontWeight: 'bold',
//   },
//   heroSubtitle: {
//     textAlign: 'center',
//     marginBottom: 24,
//     lineHeight: 20,
//     opacity: 0.8,
//   },
//   heroActions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 12,
//   },
//   button: {
//     minWidth: 140,
//   },
//    logo: {
//     width: 150, // Defina a largura desejada
//     height: 150, // Defina a altura desejada
//     resizeMode: 'contain', // Garante que a imagem se ajuste sem cortar
//     marginBottom: 20, // Espaço após a logo
//   },
// });


// export default Usuario;
