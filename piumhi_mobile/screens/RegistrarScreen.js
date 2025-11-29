import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Text, TextInput, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
 
const RegistrarScreen = () => {
  const navigation = useNavigation();
 
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [telefone, setTelefone] = useState('');
 
  const [isLoading, setIsLoading] = useState(false);
 
  const API_URL = 'http://35.222.189.84/api/v1/usuarios/registrar';
 
  const handleRegister = async () => {
  
    if (!nome || !email || !senha || !telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos (Nome, Email, Senha e Telefone).');
      return;
    }
 
    setIsLoading(true);
 
    try {
      const payload = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        isAdmin: false,
        rua: "Rua Padrão",
        apartamento: "S/N",
        cep: "00000-000",
        cidade: "Cidade Padrão",
        estado: "UF"
      };
 
      const response = await axios.post(API_URL, payload);
 
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sucesso", "Usuário criado com sucesso!");
        navigation.navigate('Login');
      }
 
    } catch (error) {
      console.error(error);
      
      if (error.response && typeof error.response.data === 'string' && error.response.data.includes('DOCTYPE')) {
         Alert.alert("Erro no Servidor", "O servidor recusou os dados. Verifique se o email já existe.");
      } else {
         const mensagem = error.response?.data?.message || "Erro ao conectar.";
         Alert.alert("Erro", String(mensagem));
      }
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Criar Conta
        </Text>
       
        <View style={styles.form}>
          <TextInput
            label="Nome"
            value={nome}
            onChangeText={setNome}
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
            left={<TextInput.Icon icon="account" />}
          />
         
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
          />
 
          <TextInput
            label="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            mode="outlined"
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="(XX) 9XXXX-XXXX"
            left={<TextInput.Icon icon="phone" />}
          />
         
          <TextInput
            label="Senha"
            value={senha}
            onChangeText={setSenha}
            mode="outlined"
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            left={<TextInput.Icon icon="lock" />}
          />
        </View>
 
        <Button
          mode="contained"
          onPress={handleRegister}
          style={styles.registerButton}
          loading={isLoading}
          disabled={isLoading}
        >
          Cadastrar
        </Button>
 
        <Button
          mode="text"
          onPress={() => navigation.goBack()}
          style={styles.button}
          disabled={isLoading}
        >
          Já tenho conta (Voltar)
        </Button>
 
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6750A4',
  },
  form: {
    marginBottom: 12,
  },
  input: {
    marginBottom: 16,
  },
  registerButton: {
    marginTop: 8,
    paddingVertical: 4,
  },
  button: {
    marginTop: 16,
  },
});
 
export default RegistrarScreen;
