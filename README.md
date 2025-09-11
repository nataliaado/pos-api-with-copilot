# API de Transferências

Esta API permite realizar login, registro de usuários, consulta de usuários e transferências de valores, com regras básicas de negócio. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

## Configuração

Antes de seguir, crie um arquivo .env na pasta raiz contendo as propriedades BASE_URL_REST e BASE_URL_GRAPHQL com a URL desses serviços.

## Estrutura de Diretórios

- `controller/` - Lógica das rotas
- `service/` - Regras de negócio
- `model/` - Dados em memória
- `app.js` - Configuração das rotas e middlewares
- `server.js` - Inicialização do servidor
- `swagger.json` - Documentação da API

## Como rodar

```bash
node server.js
```

A API estará disponível em `http://localhost:3000`.

[...existing code...]

- `POST /register` - Registrar usuário
- `POST /login` - Login de usuário
- `GET /users` - Consultar usuários
- `POST /transfer` - Realizar transferência
- `GET /transfers` - Consultar transferências
- `GET /api-docs` - Documentação Swagger

## Regras de Negócio

---

# API GraphQL

Agora este projeto também expõe uma interface GraphQL usando ApolloServer e Express.

## Instalação das dependências GraphQL

```bash
npm install apollo-server-express@3 express@4 graphql jsonwebtoken dotenv
```

## Estrutura de Diretórios GraphQL

- `graphql/app.js` - Configuração do ApolloServer e Express
- `graphql/server.js` - Inicialização do servidor
- `graphql/schema.js` - Definição dos Types, Queries e Mutations
- `graphql/resolvers.js` - Implementação das resolvers
- `graphql/auth.js` - Middleware de autenticação JWT

## Como rodar a API GraphQL

```bash
node graphql/server.js
npm run start-graphql
```

A API GraphQL estará disponível em `http://localhost:4000/graphql`.

## Exemplos de Queries e Mutations

### Login (Query)

```graphql
query {
  login(username: "Natalia", password: "123456") {
    token
    user {
      username
      favorecido
    }
  }
}
```

### Registrar Usuário (Mutation)

```graphql
mutation {
  registerUser(username: "Joaquim", password: "123456", favorecido: true) {
    username
    favorecido
  }
}
```

### Transferência (Mutation, requer JWT)

```graphql
mutation {
  transfer(from: "Natalia", to: "Lais", value: 100) {
    from
    to
    value
    date
  }
}
```

No header da requisição, inclua:

```
Authorization: Bearer <token>
```

---

1. Login exige usuário e senha.
2. Não é possível registrar usuários duplicados.
3. Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Testes

Para testar com Supertest, importe o `app.js` em seus testes sem executar o método `listen()`.

## Documentação

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger.
