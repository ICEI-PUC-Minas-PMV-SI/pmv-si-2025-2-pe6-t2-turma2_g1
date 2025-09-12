import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiHeadphones, FiMousePointer, FiType } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './Home.css';

const Home = () => {
  const featuredProducts = products.slice(0, 6);
  const categories = [
    { id: 1, name: 'Mouses', icon: FiMousePointer, count: 12 },
    { id: 2, name: 'Teclados', icon: FiType, count: 8 },
    { id: 3, name: 'Headsets', icon: FiHeadphones, count: 15 },
    { id: 4, name: 'Adaptadores', icon: FiTruck, count: 6 }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Periféricos Eletrônicos para
                <span className="text-highlight"> Empresas</span>
              </h1>
              <p className="hero-description">
                Plataforma B2B especializada em periféricos eletrônicos. 
                Compre em volume com preços corporativos, entrega rápida 
                e suporte técnico especializado.
              </p>
              <div className="hero-actions">
                <Link to="/produtos" className="btn btn-primary btn-large">
                  Ver Catálogo
                  <FiArrowRight />
                </Link>
                <Link to="/cadastro" className="btn btn-outline btn-large">
                  Cadastrar Empresa
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-graphic">
                <div className="graphic-item">
                  <FiMousePointer />
                  <span>Mouses</span>
                </div>
                <div className="graphic-item">
                  <FiType />
                  <span>Teclados</span>
                </div>
                <div className="graphic-item">
                  <FiHeadphones />
                  <span>Headsets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FiTruck />
              </div>
              <h3>Entrega Rápida</h3>
              <p>Entrega em até 24h para grandes centros urbanos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiShield />
              </div>
              <h3>Garantia Estendida</h3>
              <p>Garantia de 2 anos em todos os produtos</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <FiHeadphones />
              </div>
              <h3>Suporte Técnico</h3>
              <p>Suporte especializado para empresas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <div className="section-header">
            <h2>Categorias de Produtos</h2>
            <p>Encontre os periféricos ideais para sua empresa</p>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/produtos?categoria=${category.name.toLowerCase()}`}
                className="category-card"
              >
                <div className="category-icon">
                  <category.icon />
                </div>
                <h3>{category.name}</h3>
                <p>{category.count} produtos</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Produtos em Destaque</h2>
            <p>Os periféricos mais procurados pelas empresas</p>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-footer">
            <Link to="/produtos" className="btn btn-outline">
              Ver Todos os Produtos
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para otimizar suas compras corporativas?</h2>
            <p>
              Cadastre sua empresa e tenha acesso a preços especiais, 
              relatórios detalhados e suporte dedicado.
            </p>
            <div className="cta-actions">
              <Link to="/cadastro" className="btn btn-primary btn-large">
                Cadastrar Empresa
              </Link>
              <Link to="/produtos" className="btn btn-outline btn-large">
                Explorar Produtos
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
