import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await api.get("/produtos");
          const destaque = response.data.filter((p) => p.emDestaque);
          setFeaturedProducts(destaque);
        } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os produtos em destaque.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="loading-text">Carregando...</p>;
  if (error) return <p className="error-text">Erro: {error}</p>;

  const categorias = [
    { nome: "Mouses", rota: "/produtos?categoria=mouses" },
    { nome: "Teclados", rota: "/produtos?categoria=teclados" },
    { nome: "Headsets", rota: "/produtos?categoria=headsets" },
    { nome: "Monitores", rota: "/produtos?categoria=monitores" },
    { nome: "Cadeiras Gamer", rota: "/produtos?categoria=cadeiras" },
  ];

  return (
    <div className="home-container">
      {/* Cabeçalho */}
      <header className="home-header">
        <h1 className="home-title">PIUMHI E-COMMERCE</h1>
        <p className="home-subtitle">
          Sua solução completa em produtos eletrônicos e periféricos para empresas e entusiastas de tecnologia.
        </p>
      </header>

      {/* Categorias */}
      <section className="home-section">
        <h2 className="section-title">Categorias</h2>
        <div className="category-grid">
          {categorias.map((cat) => (
            <div key={cat.nome} className="category-card">
              <div className="category-image">Imagem da categoria</div>
              <h3>{cat.nome}</h3>
              <Link to={cat.rota} className="category-link">
                Ver produtos →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="home-section destaque-section">
        <h2 className="section-title">Produtos em Destaque</h2>
        {featuredProducts.length > 0 ? (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={product.imagem || "https://via.placeholder.com/250x150?text=Sem+Imagem"}
                  alt={product.nome}
                  className="product-image"
                />
                <h3>{product.nome}</h3>
                <p className="product-price">
                  R$ {product.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
                <Link to={`/produtos/${product._id}`} className="product-link">
                  Ver detalhes
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="empty-message">Nenhum produto em destaque no momento.</p>
        )}
      </section>

      {/* Sobre Nós */}
      <section className="home-section about-section">
        <h2 className="section-title">Sobre Nós</h2>
        <div className="about-text">
          <p>
            O <strong>PIUMHI E-COMMERCE</strong> é um projeto desenvolvido pelos alunos da
            <strong> PUC Minas</strong> com o objetivo de criar uma plataforma de comércio eletrônico
            moderna e funcional, voltada para o segmento de tecnologia e periféricos. Nosso foco é
            oferecer uma experiência simples, intuitiva e eficiente para empresas e consumidores.
          </p>
          <p>
            Este site é um protótipo acadêmico e não possui fins comerciais. Todas as informações,
            produtos e pedidos simulam o funcionamento de um e-commerce real.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>PIUMHI E-COMMERCE</h4>
            <p>
              Tecnologia e inovação ao seu alcance. Produtos de qualidade, design moderno
              e confiança garantida.
            </p>
          </div>

          <div className="footer-section">
            <h4>Institucional</h4>
            <ul>
              <li>Sobre Nós</li>
              <li>Condições de Privacidade</li>
              <li>Termos de Uso</li>
              <li>Contato</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categorias</h4>
            <ul>
              <li>Mouses</li>
              <li>Teclados</li>
              <li>Headsets</li>
              <li>Cadeiras Gamer</li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Redes Sociais</h4>
            <div className="social-icons">
              <span>📘</span>
              <span>📸</span>
              <span>🐦</span>
              <span>💼</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 PIUMHI E-COMMERCE — Projeto Acadêmico PUC Minas</p>
        </div>
      </footer>
    </div>
  );
}
