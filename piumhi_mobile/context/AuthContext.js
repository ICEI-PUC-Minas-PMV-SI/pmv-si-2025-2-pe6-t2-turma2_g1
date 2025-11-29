import React, { createContext, useState, useContext, useEffect } from 'react';


const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); []
  const signIn = () => {
    // *Lógica real de login iria aqui (chamar API, salvar token, etc.)*
    // Por enquanto, apenas mudamos o estado para true
    setIsLoggedIn(true); 
  };

  // Função para fazer logout
  const signOut = () => {
    // *Lógica real de logout iria aqui (remover token)*
    setIsLoggedIn(false); 
  };
  
  // Exemplo: Simular o carregamento inicial (pode remover se não usar)
  useEffect(() => {
    // Aqui você checaria se existe um token salvo (ex: AsyncStorage)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); 
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Criação de um Hook customizado para fácil uso
   export const useAuth = () => {
   return useContext(AuthContext);
};

// export default AuthContext