import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Perfil do Usuário</h2>
      <p>
        <strong>Nome:</strong> {user.nome}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Telefone:</strong> {user.telefone}
      </p>
    </div>
  );
};

export default ProfilePage;