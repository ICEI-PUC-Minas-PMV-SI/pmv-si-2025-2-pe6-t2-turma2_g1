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

[Inclua os wireframes das páginas principais da interface, mostrando a disposição dos elementos na página.]

### Design Visual

[Descreva o estilo visual da interface, incluindo paleta de cores, tipografia, ícones e outros elementos gráficos.]

## Fluxo de Dados

O fluxo de dados se dá à partir do login do usuário, que pode buscar produtos, mandá-los para o carrinho de compras, finalizar a compra e, mandar os dados para o histórico de pedidos. Ele também pode apenas acessar apenas o histórico ou apenas o carrinho, sem fazer outras compras.

<img width="834" height="343" alt="image" src="https://github.com/user-attachments/assets/34d67cdc-9f7e-46f2-bbdc-597525ddb723" />


## Tecnologias Utilizadas
[Lista das tecnologias principais que serão utilizadas no projeto.]


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

