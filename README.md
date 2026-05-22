# 🎵 Matthew Tunes

**Matthew Tunes** é uma aplicação web de música com um design *Dark Mode* premium e moderno, inspirado nas principais plataformas de streaming do mercado. Construída em React, a aplicação consome a API oficial do iTunes para buscar artistas, listar álbuns e reproduzir prévias de músicas.

🔗 Acesse:*(https://agent-6a0ff59da011203c--gleaming-rugelach-7b25df.netlify.app)*

---

## ✨ Funcionalidades

A aplicação possui um fluxo completo de navegação e gerenciamento de estado:

* **Identificação de Usuário:** Tela de login inicial para personalizar a sessão do usuário.
* **Busca de Artistas e Álbuns:** Integração com a *iTunes API* para pesquisar qualquer banda ou artista e retornar uma grade de álbuns (Grid Layout).
* **Detalhes do Álbum:** Ao clicar em um álbum, a aplicação lista todas as faixas disponíveis.
* **Player de Áudio:** Prévia de 30 segundos de cada faixa utilizando a tag `<audio>` nativa customizada com CSS.
* **Gerenciamento de Favoritos:** Possibilidade de favoritar (❤️) músicas, que são salvas no estado da aplicação e podem ser acessadas em uma rota exclusiva.
* **Perfil de Usuário:** Visualização e edição de perfil, com suporte a upload de imagem local (convertida para Base64 usando `FileReader`) e validação de formulários.
* **Tratamento de Rotas Inexistentes:** Página *404 Not Found* personalizada para manter a imersão do usuário caso acesse uma URL inválida.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

* **[React](https://reactjs.org/)** (Class Components e Ciclo de Vida)
* **[React Router Dom](https://v5.reactrouter.com/)** (Navegação SPA - *Single Page Application*)
* **JavaScript (ES6+)** (Lógica, manipulação de arrays e consumo de APIs)
* **CSS3** (Estilização avançada com Flexbox, CSS Grid, variáveis de cores, animações e efeitos de *hover/active*)
* **API do iTunes** (Fornecimento de dados e mídia)

---

## 🎨 Destaques de UI/UX (Interface e Experiência)

O projeto foi refatorado para sair de um layout em branco padrão para uma interface imersiva:
* **Premium Dark Mode:** Fundo OLED (`#000000`) com cards em cinza escuro (`#1c1c1e`), reduzindo a fadiga visual.
* **Identidade Visual:** Uso consistente de um gradiente vibrante (Vermelho/Laranja) para botões principais, títulos e elementos de destaque (como os botões de curtir).
* **Feedback Visual:** Componentes de *Loading* com animações em ondas sonoras (`Sound Waves`) aplicadas em CSS puro.

---

## 🛠️ Como executar o projeto localmente

Siga os passos abaixo para rodar a aplicação na sua máquina:

1. Clone este repositório

2. Entre na pasta do projeto:
Bash
cd matthew-tunes

4. Instale as dependências:
Bash
npm install

4. Execute a aplicação:
Bash
npm start

5. Acesse no navegador
O servidor iniciará localmente. Abra o seu navegador e acesse: http://localhost:3000
