# API de Transferências

Esta API permite realizar login, registro de usuários, consulta de usuários e transferências de valores, com regras básicas de negócio. O banco de dados é em memória, ideal para aprendizado de testes e automação de APIs.

## Instalação

1. Clone o repositório ou copie os arquivos para seu ambiente local.
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express
   ```

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

## Endpoints

- `POST /register` - Registrar usuário
- `POST /login` - Login de usuário
- `GET /users` - Consultar usuários
- `POST /transfer` - Realizar transferência
- `GET /transfers` - Consultar transferências
- `GET /api-docs` - Documentação Swagger

## Regras de Negócio

1. Login exige usuário e senha.
2. Não é possível registrar usuários duplicados.
3. Transferências para destinatários não favorecidos só podem ser feitas se o valor for menor que R$ 5.000,00.

## Testes

Para testar com Supertest, importe o `app.js` em seus testes sem executar o método `listen()`.

## Documentação

Acesse `/api-docs` para visualizar e testar os endpoints via Swagger.
