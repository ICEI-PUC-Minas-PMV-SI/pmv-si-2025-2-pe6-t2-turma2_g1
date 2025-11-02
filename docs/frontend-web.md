# Front-end Web

## Descrição do Projeto

O front-end do PIUMHI E-commerce é a interface web da plataforma B2B, especializada na comercialização de equipamentos eletrônicos. Foi desenvolvida para oferecer a empresas de médio e grande porte uma experiência de compra escalável, eficiente e intuitiva.

### Objetivos Principais

*   **Interface de Usuário Corporativa:** Prover uma experiência de compra limpa e responsiva, focada nas necessidades de clientes B2B.
*   **Design Intuitivo:** Navegação simplificada para facilitar compras em volume e processos recorrentes.
*   **Catálogo de Produtos:** Apresentar um catálogo organizado por categorias.
*   **Carrinho de Compras e Checkout:** Oferecer um carrinho de compras integrado e um processo de checkout seguro.
*   **Histórico de Pedidos e Relatórios:** Permitir que os clientes acessem um histórico de pedidos detalhado.

## Projeto da Interface Web

A interface web do projeto consiste em uma aplicação moderna e responsiva, projetada para garantir uma experiência de usuário simples e direta, desde o login e a navegação no catálogo até a finalização de pedidos complexos e o gerenciamento da conta corporativa.

### Páginas Principais

*   **Página de Login/Registro:** Acesso seguro para usuários corporativos.
*   **Página Principal (Catálogo de Produtos):** Exibição dos produtos com filtros por categoria.
*   **Página do Carrinho:** Gerenciamento dos itens selecionados para compra.
*   **Página de Checkout:** Finalização do pedido.
*   **Painel do Cliente:** Acesso ao histórico de pedidos.

### Wireframes

**Tela de Login**
![Tela de Login](img/login.png)

**Tela de Registro**
![Tela de Registro](img/registro.png)

**Tela Inicial (Home Screen)**
![Home Screen](img/homescreen.png)

**Página de Produtos**
![Página de Produtos](img/paginadeprodutos.png)

**Carrinho de Compras**
![Carrinho de Compras](img/carrinhodecompras.png)

**Histórico de Pedidos**
![Histórico de Pedidos](img/historicodepedidos.png)



### Design Visual

Paleta de Cores

A interface segue uma paleta moderna e limpa, inspirada em tons neutros e corporativos:

Cor	Hexadecimal	Uso principal
Branco	#FFFFFF	Fundo dos cards, formulários e contêineres
Cinza claro	#F8F9FA	Fundo geral das páginas e áreas neutras
Cinza médio	#DEE2E6 / #CED4DA	Bordas sutis e divisores
Cinza escuro	#212529 / #495057	Texto principal e títulos
Azul primário	#007BFF	Botões, links e destaques
Azul escuro	#0056B3	Efeito hover em botões e links
Verde	#28A745	Botões de confirmação (Finalizar compra)
Verde escuro	#218838	Hover do botão de confirmação
Vermelho	#DC3545	Botões de exclusão, mensagens de erro
Vermelho escuro	#BB2D3B	Hover em botões de remoção

➡️ Resumo: A paleta é clara e profissional, combinando tons de azul e verde para ações positivas, com vermelho para alertas e erros. O uso de branco e cinza garante contraste e legibilidade.

Tipografia

A interface utiliza fontes sans-serif modernas, com alta legibilidade e visual limpo.

Fontes principais:

-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif

Estilo predominante:

Textos médios (14–16px), regulares, com espaçamento equilibrado

Títulos em peso 600 (semibold) para destaque

Cabeçalhos (h2, h3) geralmente centralizados e com espaçamento vertical generoso

➡️ O resultado é um design corporativo e moderno, sem elementos visuais excessivos.

Elementos Gráficos e Layout

Containers e Cards:
Blocos brancos com cantos levemente arredondados (border-radius: 8px) e sombras suaves (box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)), o que cria profundidade sutil e elegância.

Botões:
Grandes, com cores sólidas, texto branco e bordas arredondadas. Têm transições suaves de cor no hover.
Exemplo:

Azul (ação principal)

Verde (confirmação)

Vermelho (remoção)

Inputs e Formulários:
Campos amplos, com boa margem interna (padding) e destaque no foco (border-color: #007bff com box-shadow).
O feedback visual ao digitar dá uma sensação de interatividade e resposta imediata.

Alertas e mensagens de erro:
Fundo vermelho claro com borda e texto vermelho escuro, visualmente consistente com a identidade de alerta.

Disposição:
As seções são centralizadas e possuem espaçamento interno generoso (padding: 2rem 3rem), favorecendo clareza e hierarquia visual.

Hover e Interações:
Os elementos (cards, botões) têm animações sutis, como:

Sombreamento suave ao passar o mouse

Leve aumento de escala nos cards (transform: scale(1.03))

➡️ Isso reforça a sensação de interface responsiva, moderna e agradável.

Ícones e Componentes Interativos

Ícones simples (como de senha ou menu) seguem um estilo minimalista.

Elementos interativos, como o botão de alternar senha (toggle-password-btn) e botões de menu, usam cores neutras e tamanhos pequenos para não distrair o usuário.

Resumo do Estilo

O design tem características clean, profissionais e acessíveis, com uma hierarquia visual clara e harmonia entre texto, botões e espaços.

🔹 Personalidade visual: Moderna, confiável, leve.
🔹 Sensação transmitida: Profissionalismo, usabilidade e foco na experiência do usuário.

## Fluxo de Dados

O fluxo de dados se dá à partir do login do usuário, que pode buscar produtos, mandá-los para o carrinho de compras, finalizar a compra e, mandar os dados para o histórico de pedidos. Ele também pode apenas acessar apenas o histórico ou apenas o carrinho, sem fazer outras compras.

<img width="834" height="343" alt="image" src="https://github.com/user-attachments/assets/34d67cdc-9f7e-46f2-bbdc-597525ddb723" />


## Tecnologias Utilizadas
A interface web foi desenvolvida com tecnologias modernas, focadas em criar uma experiência de usuário rica, reativa e de fácil manutenção. A tabela abaixo detalha as principais ferramentas:

| Categoria | Tecnologia | Versão | Por que foi escolhida? |
|---|---|---|---|
| **Linguagem** | JavaScript (ES6+) | - | Linguagem padrão da web, com uma vasta comunidade e ecossistema, essencial para criar interatividade no navegador. |
| **Framework** | React.js | 18.x | Biblioteca líder de mercado para criar interfaces de usuário componentizadas, reativas e escaláveis, facilitando a manutenção e o desenvolvimento de SPAs (Single Page Applications). |
| **Gerenciador de Pacotes** | NPM | 10.x | Ferramenta padrão do ecossistema Node.js para gerenciar as dependências do projeto, como bibliotecas e frameworks. |
| **Estilização** | Styled Components | 6.x | Permite escrever CSS diretamente no JavaScript (CSS-in-JS), facilitando a criação de componentes com estilos encapsulados e dinâmicos. |
| **Roteamento** | React Router | 6.x | Biblioteca padrão para gerenciar a navegação e as rotas em uma aplicação React, permitindo a criação de uma experiência de SPA fluida. 


## Considerações de Segurança

As principais medidas adotadas incluem:

* Autenticação segura: Utilização de tokens JWT com expiração e renovação controladas.

* Proteção contra ataques comuns: Implementação de medidas contra XSS (Cross-site Scripting), CSRF (Cross-site Request Forgery) e injeções de código.

* Criptografia: Senhas dos usuários armazenadas utilizando algoritmos de hash seguro (bcrypt).

## Implantação

Este projeto representa uma aplicação distribuída e altamente disponível, implantada e orquestrada em um cluster DigitalOcean Kubernetes (DOKS).

Tecnologia Principal
Orquestração: Kubernetes (Gerenciado pela DigitalOcean)

Hospedagem: DigitalOcean

Arquitetura: Contêineres Docker/OCI

Características da Implantação
A implantação utiliza a arquitetura de contêineres para garantir escalabilidade e resiliência inerentes.

## Testes

A estratégia de testes escolhidas foi Teste de Integração para validar a comunicação entre os componentes do front-end e a integração com a API.

Para realizarmos, percorremos o site como usuários reais, exercitamos as funcionalidades integradas oferecidas e registramos o comportamento observado, com o intuito de validar que os componentes do sistema funcionam juntos conforme esperado. Para tal, registramos momentos em que o software funcionou e, também, levantou exceções como esperado.

Os registros foram feitos à partir de prints do software rodando em tempo real.

Os testes foram documentados na apresentação de slides de PowerPoint, disponível para download à seguir.

[Teste de Integração - Piumhi](https://docs.google.com/presentation/d/1tD_Hrdpgb72jJKOAoUkevTGoiTynnqEx/edit?usp=sharing&ouid=109392622591362109472&rtpof=true&sd=true)

# Referências

Inclua todas as referências (livros, artigos, sites, etc) utilizados no desenvolvimento do trabalho.

# Planejamento

##  Quadro de tarefas

> Apresente a divisão de tarefas entre os membros do grupo e o acompanhamento da execução, conforme o exemplo abaixo.

### Semana 1

* Código

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Vitoria        | Correção etapa 2 | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Vitoria        | Estrutura inicial do código Front    |06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |                 |
| Nathan        | Tela HomePage.js e HomePage.css  | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Rafael        | Tela HistóricoPedidosPage.js e HistóricoPedidoPage.css e Cart.js | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Helberth        | Tela Login.js e Login.css | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Vitoria        | Tela RegistroPage.js | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Sophia        | Tela CarrinhoPage.js e CarrinhoPage.css | 06/10/2025     | 02/11/2025 | ✔️    | 02/11/2025      |
| Ian        | Tela ProfilePage.js e estilização Order.css | 06/10/2025     | 02/11/2025 | ✔️    | 02/11/2025      |
| Nathan        | Hospedagem/Orquerstração K8S | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |

#### Semana 2

* Documentação

| Responsável   | Tarefa/Requisito | Iniciado em    | Prazo      | Status | Terminado em    |
| :----         |    :----         |      :----:    | :----:     | :----: | :----:          |
| Vitoria        | Descrição do projeto e Considerações de segurança | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Helberth        | Testes | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Rafael        | Projeto da interface e Fluxo de dados | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Nathan        | Implantação | 06/10/2025     | 02/11/2025 | ✔️    | 01/11/2025      |
| Sophia        | Tecnologias e Desing Visual | 06/10/2025     | 02/11/2025 | ✔️    | 02/11/2025      |
| Ian        | Wireframes | 06/10/2025     | 02/11/2025 | ✔️    | 02/11/2025      |
| Sophia        | Slides apresentação | 06/10/2025     | 02/11/2025 | ✔️    | 02/11/2025      |

Legenda:
- ✔️: terminado
- 📝: em execução
- ⌛: atrasado
- ❌: não iniciado
