⚡ Pokédex – Web & Mobile
Este repositório contém uma Pokédex interativa desenvolvida com Next.js, React, TypeScript, Jest e React Native. O projeto está dividido em dois módulos principais:

📌 Web – Uma aplicação front-end para navegadores, oferecendo uma experiência otimizada e interativa.

📌 Mobile – Um aplicativo desenvolvido com React Native, proporcionando uma experiência fluida em dispositivos móveis.

Abaixo, você encontrará instruções gerais para navegar no projeto e acessar as documentações específicas de cada módulo. 🚀🔥

---

# Pokédex – Web

## Sobre

Este projeto é uma Pokédex desenvolvida com **Next.js**, **React**, **TypeScript**, **React Query** e Jest para testes. A aplicação exibe uma lista de Pokémon com detalhes como nome, categoria, habilidades e imagem. Além disso, cada Pokémon possui botões de **like** e **dislike**, permitindo a interação do usuário de forma dinâmica. 🚀

## Dependências

- **Fetch** para requisições HTTP
- **React Query** para gerenciamento de estado assíncrono
- **Jest** para testes
- **React Testing Library** para testes de componente
- **Tailwind CSS** para estilização
- **React Icons** para icones
- **TypeScript** para tipagem

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone git@github.com:GabrielSilvaCosta/pokemon-challage.git
   ```
2. **Navegue até o diretório do projeto:**
   ```sh
   cd pokemon-challage
   ```
3. **Instale as dependências:**
   ```sh
   npm install
   ```

## Executando a aplicação

Para rodar a API localmente, utilize o comando:

```sh
npm run dev
```

> **Nota:** Certifique-se de estar na pasta `pokemon-challage`.

### Requisitos

- **Node.js** versão **18** ou superior

## Testes

Para rodar os testes localmente, use o comando:

```sh
npm test -- --watchAll=false
```

---

# Pokédex – Mobile

Sobre

A versão mobile da Pokédex foi desenvolvida utilizando **React Native**, oferecendo uma experiência imersiva para dispositivos móveis. O aplicativo exibe a lista de Pokémon com suas respectivas informações e permite interações como curtir e descurtir cada Pokémon.

## Dependências

**React-native-webview** para abrir páginas web dentro da aplicação.
**React-navigation** para gerenciamento de navegação entre telas.
**AsyncStorage** para persistência de dados no dispositivo.
**Expo** para desenvolvimento e publicação da aplicação.
**React-native-vector-icons** para icones.
**TypeScript** para tipagem.

## Instalação

1. **Clone o repositório:**
   ```sh
   git clone git@github.com:GabrielSilvaCosta/pokemon-challage.git
   ```
2. **Navegue até o diretório do projeto:**
   ```sh
   cd mobile
   ```
3. **Instale as dependências:**

   ```sh
   npm install

   ```

## Executando a aplicação

Para rodar a API localmente, utilize o comando:

```sh
npx expo start

```

> **Nota:** Certifique-se de estar na pasta `mobile`.

### Requisitos

- **Node.js** versão **18** ou superior
