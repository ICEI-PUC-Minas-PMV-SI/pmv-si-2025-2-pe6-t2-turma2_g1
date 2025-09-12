import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro quando usuário começar a digitar
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simular autenticação (em produção, isso seria uma chamada para a API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados do usuário
      const userData = {
        id: 1,
        name: 'Carlos Silva',
        email: formData.email,
        company: 'TechCorp Ltda',
        role: 'Gerente de Compras',
        cnpj: '12.345.678/0001-90',
        phone: '(11) 99999-9999'
      };

      login(userData);
      navigate('/');
    } catch (err) {
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="login-container">
          <div className="login-form-container">
            <div className="login-header">
              <h1>Entrar na sua conta</h1>
              <p>Acesse sua conta corporativa para continuar</p>
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email corporativo
                </label>
                <div className="input-group">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="seu.email@empresa.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <div className="input-group">
                  <FiLock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Lembrar de mim</span>
                </label>
                <Link to="/esqueci-senha" className="forgot-password">
                  Esqueci minha senha
                </Link>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large login-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>
                Não tem uma conta?{' '}
                <Link to="/cadastro" className="link">
                  Cadastre sua empresa
                </Link>
              </p>
            </div>
          </div>

          <div className="login-info">
            <div className="info-content">
              <h2>Bem-vindo ao TechPeriféricos B2B</h2>
              <p>
                A plataforma especializada em periféricos eletrônicos para empresas. 
                Compre em volume com preços corporativos e tenha acesso a:
              </p>
              
              <ul className="features-list">
                <li>
                  <span className="feature-icon">✓</span>
                  Preços especiais para compras em volume
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  Relatórios detalhados de compras
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  Suporte técnico especializado
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  Entrega rápida e rastreamento
                </li>
                <li>
                  <span className="feature-icon">✓</span>
                  Gestão de múltiplos endereços
                </li>
              </ul>

              <div className="testimonial">
                <blockquote>
                  "A plataforma revolucionou nossa gestão de compras. 
                  Agora conseguimos padronizar nossos equipamentos e 
                  reduzir custos significativamente."
                </blockquote>
                <cite>
                  <strong>Carlos Silva</strong><br />
                  Gerente de Compras - TechCorp
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


