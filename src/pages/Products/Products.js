import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiGrid, FiList } from 'react-icons/fi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories } from '../../data/products';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || '');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoria
    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  // Atualizar URL quando filtros mudarem
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('categoria', selectedCategory);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, setSearchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    // A busca já é feita em tempo real pelo useMemo
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="page-header">
          <h1>Catálogo de Produtos</h1>
          <p>Encontre os periféricos ideais para sua empresa</p>
        </div>

        <div className="products-content">
          {/* Filtros Sidebar */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>Filtros</h3>
              <button 
                className="clear-filters"
                onClick={clearFilters}
              >
                Limpar
              </button>
            </div>

            {/* Busca */}
            <div className="filter-group">
              <label className="filter-label">Buscar</label>
              <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-group">
                  <input
                    type="text"
                    placeholder="Nome do produto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <FiSearch />
                  </button>
                </div>
              </form>
            </div>

            {/* Categoria */}
            <div className="filter-group">
              <label className="filter-label">Categoria</label>
              <div className="category-filters">
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>Todas as categorias</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="category-option">
                    <input
                      type="radio"
                      name="category"
                      value={category.name}
                      checked={selectedCategory === category.name}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ordenação */}
            <div className="filter-group">
              <label className="filter-label">Ordenar por</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Nome (A-Z)</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="stock">Maior estoque</option>
              </select>
            </div>
          </aside>

          {/* Produtos */}
          <main className="products-main">
            <div className="products-toolbar">
              <div className="results-info">
                <span>
                  {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              <div className="toolbar-actions">
                <button
                  className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Visualização em grade"
                >
                  <FiGrid />
                </button>
                <button
                  className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Visualização em lista"
                >
                  <FiList />
                </button>
                <button
                  className="mobile-filters-toggle"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FiFilter />
                  Filtros
                </button>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={`products-grid ${viewMode}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente ajustar os filtros ou termo de busca</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Limpar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;


