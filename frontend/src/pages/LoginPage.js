import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/Auth.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validação do formato do email
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um formato de email válido.');
      return;
    }

    try {
      await login(email, senha);
      navigate('/perfil');
    } catch (err) {
      setError(err.response?.data?.message || 'Ocorreu um erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-container">
        <h2>Login</h2>
        {message && <p>{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                id="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password-btn">
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-submit">Entrar</button>
        </form>
        <p className="form-switch">
          Não tem uma conta? <Link to="/registrar">Registre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
