import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 


import { useAuth } from '../context/AuthContext';
 
const LoginScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  
  const { signIn } = useAuth(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const API_URL = 'http://35.222.189.84/api/v1/usuarios/login';
  
  const handleLogin = async () => {
   
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha email e senha.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      
      const dadosParaEnviar = {
        email: email,      
        senha: password    
      };
  
      
      const response = await axios.post(API_URL, dadosParaEnviar);
  
      const tokenRecebido = response.data.token;
      const usuarioRecebido = response.data.usuario;
  
      
      await AsyncStorage.setItem('token', tokenRecebido);
      await AsyncStorage.setItem('usuario', JSON.stringify(usuarioRecebido));
      
     
      signIn(); 

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
  
    } catch (error) {
      console.error('Erro no login:', error);
  
      if (error.response) {
        Alert.alert('Erro de Acesso', String(error.response.data));
      } else {
        Alert.alert('Erro', 'Verifique sua conexão com a internet.');
      }
    } finally {
      setIsLoading(false); 
    }
  };
  
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
      
       <View style={styles.header}>
         <Text variant="headlineMedium" style={styles.title}>
           Login
         </Text>
         <Text variant="bodyMedium" style={styles.subtitle}>
           Entre com sua conta para continuar
         </Text>
       </View>
    
       <View style={styles.form}>
         <TextInput
           label="Email"
           value={email}
           onChangeText={setEmail}
           mode="outlined"
           style={styles.input}
           keyboardType="email-address"
           autoCapitalize="none"
           left={<TextInput.Icon icon={() => <Icon name="email" size={24} color="#666" />} />}
         />
    
         <TextInput
           label="Senha"
           value={password}
           onChangeText={setPassword}
           mode="outlined"
           secureTextEntry
           style={styles.input}
           autoCapitalize="none"
           left={<TextInput.Icon icon={() => <Icon name="lock" size={24} color="#666" />} />}
         />
    
         <Button
           mode="contained"
           onPress={handleLogin}
           style={styles.button}
           loading={isLoading}
           disabled={isLoading}
         >
           Entrar
         </Button>
    
         <View style={styles.footer}>
           <Text variant="bodyMedium">Não tem uma conta? </Text>
           <Button mode="text" onPress={() => navigation.navigate('Registrar')}>
             Cadastre-se
           </Button>
         </View>
       </View>
    </ScrollView>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginVertical: 32,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#6750A4'
  },
  subtitle: {
    opacity: 0.6,
  },
  form: {
    marginHorizontal: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
});
    
export default LoginScreen;
