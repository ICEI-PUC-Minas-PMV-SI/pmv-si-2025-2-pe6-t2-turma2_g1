# Front-end Móvel

O projeto do front-end móvel consiste no desenvolvimento de um aplicativo para iOS e Android que serve como cliente para a plataforma de e-commerce B2B. O objetivo principal é oferecer uma experiência de compra nativa, ágil e intuitiva para os clientes corporativos, permitindo que realizem pedidos, consultem o catálogo de produtos e gerenciem suas contas diretamente de seus smartphones.

Desenvolvido com React Native e Expo, o aplicativo utiliza uma única base de código para ambas as plataformas, garantindo consistência visual e funcional. Ele se conecta à mesma API RESTful do back-end utilizada pela aplicação web, assegurando a sincronia de dados como estoque, pedidos e informações de usuários.

## Projeto da Interface
A interface móvel da aplicação foi desenvolvida com uma abordagem pragmática e funcional, utilizando o ecossistema React Native e a biblioteca de componentes React Native Paper. Isso estabelece uma base sólida no Material Design, garantindo uma experiência de usuário consistente, familiar e visualmente coesa em toda a aplicação.

Design Visual e Componentização O estilo visual é diretamente influenciado pelo Material Design, fornecido pelo react-native-paper.
Componentes Principais: A interface é construída com componentes padrão do Material Design, como:

Surface e Card: Usados extensivamente para agrupar informações, criando elevação e separação visual clara (visto em HomePage, HistoricoPedidos, CarrinhoCompras e ProdutosScreen). Button: Utilizado em seus diferentes modos (contained, outlined, text) para hierarquizar ações, desde chamadas primárias (Login, Finalizar Compra) até ações secundárias (Tentar Novamente, Ver Detalhes). TextInput: Implementado no estilo outlined com ícones, proporcionando um visual moderno e claro para formulários de Login e Registro. ActivityIndicator e Text: Combinados para criar estados de carregamento claros, informando ao usuário que os dados estão sendo buscados. Paleta de Cores (via useTheme): A aplicação utiliza o sistema de temas do react-native-paper. As cores são aplicadas de forma semântica, aproveitando o theme.colors:

primaryContainer: Usado como fundo para seções de destaque (heroSection) na Home e no Histórico, criando um ponto focal suave. primary: Cor de destaque para elementos importantes, como o indicador de carregamento. surface e surfaceVariant: Cores de fundo para os cards e superfícies, garantindo contraste e legibilidade. error: Aplicada consistentemente em textos de erro e botões de remoção (como no carrinho), fornecendo feedback visual imediato. Tipografia (via variant): A hierarquia de texto é gerenciada pela propriedade variant do componente Text, utilizando a escala tipográfica do Material Design:

headlineLarge / headlineMedium: Para títulos principais de páginas (HomePage, RegistrarScreen). titleMedium / titleLarge: Para títulos de cards e seções. bodyLarge / bodyMedium: Para textos descritivos e parágrafos. Iconografia: O uso de react-native-vector-icons/MaterialIcons reforça a identidade Material Design, com ícones claros e reconhecíveis aplicados em botões, inputs e indicadores de status.

Layout e Estrutura das Páginas O layout das telas é vertical e focado em tarefas, com uma estrutura clara e consistente.
Telas de Autenticação (Login.js, RegistrarScreen.js):

Layout: Formulário centralizado, utilizando ScrollView para se adaptar a diferentes tamanhos de tela. O layout é limpo, com um cabeçalho, campos de TextInput bem espaçados e botões de ação claros. Interação: O estado de isLoading desabilita os botões e exibe um loading durante a submissão, fornecendo feedback claro sobre a atividade de rede. Tela Principal (HomePage.js):

Layout: Funciona como um portal central. Uma grande Surface contém o logo e uma série de botões que direcionam para as principais funcionalidades. Interação: A lógica condicional (isLoggedIn) adapta a interface, exibindo botões de "Login/Criar Conta" para visitantes e "Carrinho/Histórico/Sair" para usuários autenticados. Tela de Produtos (ProdutosScreen.js):

Layout: O conteúdo principal é uma FlatList que renderiza Cards de produtos, uma abordagem eficiente para listas longas. Cada card é bem estruturado com Card.Cover, Card.Content e Card.Actions. Interação: Esta é a tela mais interativa. Cada card possui um seletor de quantidade (usando IconButton de minus e plus) e um botão "Adicionar" que reflete a quantidade selecionada. Um Alert customizado oferece ao usuário a opção de continuar comprando ou ir para o carrinho. Tela de Histórico (HistoricoPedidos.js):

Layout: Similar à tela de produtos, usa uma FlatList para exibir os pedidos passados em Surfaces individuais. A informação é organizada de forma clara: ID, data, status (com ícone) e total. Interação: Um botão "Ver Detalhes" em cada card aciona um Alert simples para mostrar mais informações, uma solução rápida sem a necessidade de navegar para outra tela. Tela do Carrinho (CarrinhoCompras.js):

Layout: Utiliza uma ScrollView com .map() para renderizar os itens, ideal para listas que não são excessivamente longas. A tela é dividida em três partes claras: a lista de itens, a seção de total e os botões de ação final. Interação: O usuário pode remover itens individualmente. O botão "Finalizar Compra" fica desabilitado se o carrinho estiver vazio ou durante o processamento, prevenindo ações indesejadas. 3. Fluxo de Usuário e Interações Navegação: O fluxo é gerenciado pelo @react-navigation/native. A navegação é explícita, baseada em botões que levam o usuário de uma tela para outra (ex: Home -> Produtos -> Carrinho). Feedback ao Usuário: Alertas: O Alert.alert é usado de forma eficaz para confirmar ações (item adicionado ao carrinho), notificar sucesso (pedido finalizado) ou exibir erros. Estados de Carregamento e Erro: Todas as telas que buscam dados da API (fetchProdutos, fetchPedidos) implementam uma lógica de três estados: isLoading (mostra ActivityIndicator), error (mostra mensagem e botão "Tentar Novamente") e sucesso (mostra a lista de dados). Isso torna a aplicação robusta e transparente para o usuário. Componente Reutilizável (Container): A presença de um componente Container sugere uma boa prática de encapsular o layout de base, garantindo que todas as telas compartilhem uma estrutura e preenchimento consistentes.

### Wireframes

[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual

[Descreva o estilo visual da interface, incluindo paleta de cores, tipografia, ícones e outros elementos gráficos.]

## Fluxo de Dados

[Diagrama ou descrição do fluxo de dados na aplicação.]

## Tecnologias Utilizadas

[Lista das tecnologias principais que serão utilizadas no projeto.]

## Considerações de Segurança

A segurança é um dos pilares fundamentais da nossa aplicação, tanto para proteger os dados dos usuários quanto para garantir a integridade das transações realizadas na plataforma. A seguir estão as principais práticas e mecanismos implementados:

---

### Autenticação e Autorização

- Utilização de **JWT (JSON Web Tokens)** para manter sessões de usuários com validade controlada e expiração.
- Tokens são armazenados com segurança no **AsyncStorage** no mobile, evitando exposições acidentais.

---

###  Proteção de Dados

- Dados sensíveis como senhas **nunca são armazenados diretamente**.
- Utiliza-se **hashing seguro (ex: bcrypt)** no backend quando necessário.
- Comunicação entre cliente e servidor é feita exclusivamente via **HTTPS**, garantindo confidencialidade no transporte.

---

###  Boas Práticas de API

- Rotas protegidas exigem **verificação do JWT**.
- Validação de dados de entrada para evitar **injeções de código**.

---

###  Segurança de Dependências

- Bibliotecas são mantidas **atualizadas**.
- Ferramentas como **npm audit** e **Dependabot** são utilizadas para identificar vulnerabilidades conhecidas.

---


## Implantação

[Instruções para implantar a aplicação distribuída em um ambiente de produção.]

1. Defina os requisitos de hardware e software necessários para implantar a aplicação em um ambiente de produção.
2. Escolha uma plataforma de hospedagem adequada, como um provedor de nuvem ou um servidor dedicado.
3. Configure o ambiente de implantação, incluindo a instalação de dependências e configuração de variáveis de ambiente.
4. Faça o deploy da aplicação no ambiente escolhido, seguindo as instruções específicas da plataforma de hospedagem.
5. Realize testes para garantir que a aplicação esteja funcionando corretamente no ambiente de produção.

## Testes

[Descreva a estratégia de teste, incluindo os tipos de teste a serem realizados (unitários, integração, carga, etc.) e as ferramentas a serem utilizadas.]

1. Crie casos de teste para cobrir todos os requisitos funcionais e não funcionais da aplicação.
2. Implemente testes unitários para testar unidades individuais de código, como funções e classes.
3. Realize testes de integração para verificar a interação correta entre os componentes da aplicação.
4. Execute testes de carga para avaliar o desempenho da aplicação sob carga significativa.
5. Utilize ferramentas de teste adequadas, como frameworks de teste e ferramentas de automação de teste, para agilizar o processo de teste.

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.

# Planejamento

##  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

### Semana 1

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Introdução | 01/02/2024     | 07/02/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | Objetivos    | 03/02/2024     | 10/02/2024 | 📝    |                 |
| AlunoY        | Histórias de usuário  | 01/01/2024     | 07/01/2005 | ⌛     |                 |
| AlunoK        | Personas 1  |    01/01/2024        | 12/02/2005 | ❌    |       |

#### Semana 2

Atualizado em: 21/04/2024

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| AlunaX        | Página inicial   | 01/02/2024     | 07/03/2024 | ✔️    | 05/02/2024      |
| AlunaZ        | CSS unificado    | 03/02/2024     | 10/03/2024 | 📝    |                 |
| AlunoY        | Página de login  | 01/02/2024     | 07/03/2024 | ⌛     |                 |
| AlunoK        | Script de login  |  01/01/2024    | 12/03/2024 | ❌    |       |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado

