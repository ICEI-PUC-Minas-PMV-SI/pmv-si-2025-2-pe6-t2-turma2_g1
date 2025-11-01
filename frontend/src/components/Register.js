import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import axios from 'axios';
import '../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
  });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { nome, email, senha, telefone } = formData;

  const onChange = (e) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      // Remove todos os caracteres que não são dígitos
      const numericValue = value.replace(/\D/g, '');
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateEmail = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Formato de email inválido.');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    validateEmail(); // Re-valida no submit para garantir
    // Validação do formato do email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um formato de email válido.');
      return;
    }

    try {
      await api.post('/usuarios/registrar', {
        nome,
        email,
        senha,
        telefone,
      });
      // Redireciona para a página de login após o sucesso
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Não foi possível criar o usuário.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Criar Conta</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input type="text" id="nome" name="nome" value={nome} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={onChange} onBlur={validateEmail} required />
            {emailError && <p className="error-message" style={{ marginTop: '5px' }}>{emailError}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input type="tel" id="telefone" name="telefone" value={telefone} onChange={onChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <div className="password-wrapper">
              <input type={showPassword ? 'text' : 'password'} id="senha" name="senha" value={senha} onChange={onChange} required minLength="6" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password-btn">
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-submit">Registrar</button>
        </form>
        <p className="form-switch">
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;