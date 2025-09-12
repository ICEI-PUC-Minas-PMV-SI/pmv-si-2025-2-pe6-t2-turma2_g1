# TechPeriféricos B2B - E-commerce Corporativo

Uma plataforma de e-commerce especializada em periféricos eletrônicos para empresas, desenvolvida com React.js.

## 🚀 Funcionalidades

### ✅ Implementadas

- **Sistema de Autenticação**
  - Login e cadastro de empresas
  - Gestão de usuários corporativos
  - Persistência de sessão

- **Catálogo de Produtos**
  - Visualização de produtos com filtros
  - Busca por nome, categoria e descrição
  - Ordenação por preço, nome e estoque
  - Visualização em grade e lista

- **Carrinho de Compras**
  - Adicionar/remover produtos
  - Ajustar quantidades
  - Cálculo automático de totais
  - Persistência no localStorage

- **Gestão de Pedidos**
  - Histórico de pedidos
  - Acompanhamento de status
  - Detalhes completos dos pedidos

- **Interface Responsiva**
  - Design adaptável para mobile, tablet e desktop
  - Navegação otimizada para diferentes dispositivos

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React.js 18
- **Roteamento**: React Router DOM
- **Ícones**: React Icons (Feather Icons)
- **Estilização**: CSS3 com variáveis customizadas
- **Gerenciamento de Estado**: Context API
- **Persistência**: localStorage

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header/         # Cabeçalho da aplicação
│   └── ProductCard/    # Card de produto
├── contexts/           # Contextos do React
│   ├── CartContext.js  # Gerenciamento do carrinho
│   └── UserContext.js  # Gerenciamento de usuários
├── data/              # Dados mockados
│   └── products.js    # Catálogo de produtos
├── pages/             # Páginas da aplicação
│   ├── Home/          # Página inicial
│   ├── Products/      # Catálogo de produtos
│   ├── ProductDetail/ # Detalhes do produto
│   ├── Cart/          # Carrinho de compras
│   ├── Orders/        # Histórico de pedidos
│   ├── Login/         # Página de login
│   └── Register/      # Página de cadastro
├── App.js             # Componente principal
├── App.css            # Estilos globais
├── index.js           # Ponto de entrada
└── index.css          # Reset e utilitários
```

## 🎯 Público-Alvo

A plataforma foi desenvolvida para atender empresas de médio e grande porte que necessitam:

- **Compras em volume** com preços corporativos
- **Padronização** de equipamentos
- **Relatórios detalhados** de compras
- **Suporte técnico** especializado
- **Entrega rápida** e rastreamento

## 👥 Personas

### Carlos - Gerente de Compras
- Busca otimizar processos de aquisição
- Precisa de fornecedores confiáveis
- Quer padronizar equipamentos da empresa

### Ana - Coordenadora de TI
- Foca em qualidade e compatibilidade
- Precisa de informações técnicas detalhadas
- Quer equipamentos padronizados em lote

### Marcos - Coordenador de Logística
- Prioriza entregas corretas e rápidas
- Precisa de rastreamento em tempo real
- Quer evitar problemas de entrega

## 🚀 Como Executar

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Executar em modo de desenvolvimento**:
   ```bash
   npm start
   ```

3. **Acessar a aplicação**:
   Abra [http://localhost:3000](http://localhost:3000) no navegador

## 📱 Responsividade

A aplicação foi desenvolvida com design responsivo, otimizada para:

- **Desktop**: Layout completo com sidebar de filtros
- **Tablet**: Layout adaptado com filtros colapsáveis
- **Mobile**: Interface otimizada para toque

## 🎨 Design System

### Cores
- **Primária**: #3b82f6 (Azul)
- **Secundária**: #6b7280 (Cinza)
- **Sucesso**: #10b981 (Verde)
- **Aviso**: #f59e0b (Amarelo)
- **Erro**: #ef4444 (Vermelho)

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Tamanhos**: 0.75rem a 3.5rem
- **Pesos**: 300, 400, 500, 600, 700

### Componentes
- **Botões**: Bordas arredondadas, estados hover/active
- **Cards**: Sombras sutis, hover effects
- **Formulários**: Validação visual, feedback imediato

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- **CartContext**: Gerencia itens do carrinho
- **UserContext**: Gerencia autenticação e dados do usuário
- **Persistência**: Dados salvos no localStorage

### Roteamento
- **Rotas protegidas**: Páginas que requerem autenticação
- **Navegação programática**: Redirecionamentos automáticos
- **Parâmetros de URL**: Filtros e busca via query params

### Performance
- **Lazy loading**: Imagens carregadas sob demanda
- **Memoização**: Componentes otimizados com useMemo
- **Bundle splitting**: Código dividido por rotas

## 📊 Dados Mockados

O projeto inclui dados de exemplo para demonstração:

- **8 produtos** em diferentes categorias
- **5 categorias** (Mouses, Teclados, Headsets, Adaptadores, Acessórios)
- **3 pedidos** de exemplo com diferentes status
- **Usuário demo** para testes

## 🔮 Próximos Passos

Para evoluir a aplicação, considere implementar:

1. **Backend Integration**
   - API REST com Node.js/Express
   - Banco de dados MySQL
   - Autenticação JWT

2. **Funcionalidades Avançadas**
   - Sistema de avaliações
   - Wishlist/Favoritos
   - Notificações em tempo real
   - Chat de suporte

3. **Melhorias de UX**
   - Busca com autocomplete
   - Filtros avançados
   - Comparação de produtos
   - Recomendações personalizadas

4. **Analytics e Relatórios**
   - Dashboard administrativo
   - Relatórios de vendas
   - Métricas de performance
   - A/B testing

## 📄 Licença

Este projeto foi desenvolvido como parte do Projeto Eixo 6 - PMV SI 2025-2.

---

**Desenvolvido com ❤️ para o mercado corporativo brasileiro**