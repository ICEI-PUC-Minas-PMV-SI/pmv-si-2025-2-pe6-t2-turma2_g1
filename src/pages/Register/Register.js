import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import { FiMail, FiLock, FiUser, FiHome, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    cnpj: '',
    phone: '',
    role: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const formatCNPJ = (value) => {
    // Remove tudo que não é dígito
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara
    return numbers
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

  const handleCNPJChange = (e) => {
    const formatted = formatCNPJ(e.target.value);
    setFormData(prev => ({
      ...prev,
      cnpj: formatted
    }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({
      ...prev,
      phone: formatted
    }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      // Simular cadastro (em produção, isso seria uma chamada para a API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dados do usuário criado
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        company: formData.company,
        role: formData.role,
        cnpj: formData.cnpj,
        phone: formData.phone
      };

      login(userData);
      navigate('/');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="register-container">
          <div className="register-form-container">
            <div className="register-header">
              <h1>Cadastrar Empresa</h1>
              <p>Crie sua conta corporativa e tenha acesso a preços especiais</p>
            </div>

            {error && (
              <div className="alert alert-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Nome completo
                  </label>
                  <div className="input-group">
                    <FiUser className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                </div>

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
              </div>

              <div className="form-row">
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
                      placeholder="Mínimo 6 caracteres"
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

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar senha
                  </label>
                  <div className="input-group">
                    <FiLock className="input-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Digite a senha novamente"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Nome da empresa
                  </label>
                  <div className="input-group">
                    <FiHome className="input-icon" />
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Nome da sua empresa"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cnpj" className="form-label">
                    CNPJ
                  </label>
                  <div className="input-group">
                    <FiHome className="input-icon" />
                    <input
                      type="text"
                      id="cnpj"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleCNPJChange}
                      className="form-input"
                      placeholder="00.000.000/0000-00"
                      maxLength="18"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Telefone
                  </label>
                  <div className="input-group">
                    <FiPhone className="input-icon" />
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="form-input"
                      placeholder="(11) 99999-9999"
                      maxLength="15"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="role" className="form-label">
                    Cargo
                  </label>
                  <div className="input-group">
                    <FiUser className="input-icon" />
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Selecione seu cargo</option>
                      <option value="Gerente de Compras">Gerente de Compras</option>
                      <option value="Coordenador de TI">Coordenador de TI</option>
                      <option value="Coordenador de Logística">Coordenador de Logística</option>
                      <option value="Diretor">Diretor</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" required />
                  <span>
                    Aceito os{' '}
                    <Link to="/termos" className="link">
                      Termos de Uso
                    </Link>{' '}
                    e{' '}
                    <Link to="/privacidade" className="link">
                      Política de Privacidade
                    </Link>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-large register-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Criando conta...
                  </>
                ) : (
                  'Criar Conta Corporativa'
                )}
              </button>
            </form>

            <div className="register-footer">
              <p>
                Já tem uma conta?{' '}
                <Link to="/login" className="link">
                  Faça login
                </Link>
              </p>
            </div>
          </div>

          <div className="register-benefits">
            <div className="benefits-content">
              <h2>Benefícios da conta corporativa</h2>
              
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">💰</div>
                  <h3>Preços especiais</h3>
                  <p>Descontos exclusivos para compras em volume</p>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">📊</div>
                  <h3>Relatórios detalhados</h3>
                  <p>Acompanhe todas as suas compras e gastos</p>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">🚚</div>
                  <h3>Entrega prioritária</h3>
                  <p>Frete grátis e entrega mais rápida</p>
                </div>
                
                <div className="benefit-item">
                  <div className="benefit-icon">🎯</div>
                  <h3>Suporte dedicado</h3>
                  <p>Atendimento especializado para empresas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
