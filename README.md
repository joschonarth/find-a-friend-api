# 🐶 Find A Friend

**Find A Friend** é uma plataforma que facilita a adoção de pets, conectando organizações de adoção com pessoas que desejam adotar animais. O sistema permite criar organizações, autenticar-se como uma organização, cadastrar pets, buscar por pets e visualizar detalhes sobre os animais disponíveis para adoção.

## 🛠️ Tecnologias Utilizadas

- 🟢 **Node.js**: Plataforma para execução do JavaScript no servidor.
- 🟦 **TypeScript**: Superset do JavaScript com tipagem estática.
- ⚡ **Fastify**: Framework web de alta performance para Node.js.
- 🗄️ **PostgreSQL**: Banco de dados relacional utilizado para armazenar informações.
- 🛢️ **Prisma**: ORM moderno para interações com o banco de dados.
- 🐳 **Docker**: Containerização para ambiente de desenvolvimento.
- 💎 **Zod**: Validação de esquemas e dados.
- 🛡️ **JWT**: Json Web Tokens para autenticação.
- 🧪 **Vitest**: Framework de testes.
- 🕷️ **Supertest**: Biblioteca para testar APIs de forma simples e eficaz.
- ⚙️ **ESLint**: Linter para garantir a qualidade do código.
- 🔒 **Bcrypt**: Biblioteca para hashing de senhas.
- 🌱 **Dotenv**: Gerenciamento de variáveis de ambiente.
- ⚙️ **GitHub Actions**: Ferramenta de CI que automatiza o processo de testes e implantações.

## ⚙️ Funcionalidades

### Organizações

- 🏢 **Criar organização**: Cria uma nova organização na plataforma.
- 🔐 **Autenticar organização**: Realiza o login de uma organização existente.
- 📍 **Buscar organizações próximas**: Localiza organizações com base na localização.

### Pets

- 🐕 **Criar pet**: Cadastra um novo pet para adoção.
- 🔍 **Buscar pets**: Realiza uma busca por pets disponíveis para adoção.
- 📝 **Visualizar detalhes do pet**: Exibe as informações detalhadas de um pet.

### Adoção

- 📱 **Contatar via WhatsApp**: Permite que os adotantes entrem em contato com a organização responsável pelo pet via WhatsApp.

## 🔧 Como Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/joschonarth/node-find-a-friend.git
   ```

2. **Crie um arquivo `.env` a partir do exemplo:**

    ```bash
    cp .env.example .env
    ```

    Edite o arquivo `.env` para configurar as variáveis de ambiente necessárias.

3. **Instale as dependências:**

    ```bash
    npm install
    ```

4. Inicie o banco de dados **PostgreSQL** utilizando o container **Docker** com a imagem ``bitnami/postgresql``:

   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações do banco de dados:**

   ```bash
   npx prisma migrate dev
   ```

6. **Inicie a API:**

   ```bash
   npm run dev
   ```

   A aplicação estará disponível em [http://localhost:3333](http://localhost:3333).

## 🔗 Endpoints

### 🏢 Criar Organização

- **Descrição:** Cria uma nova organização para cadastro de pets.
- **Método:** `POST`
- **URL:** `/orgs`
- **Corpo da Requisição:**  

  ```json
  {
    "name": "Pet Love",
    "owner": "John Doe",
    "email": "john.doe@example.com",
    "whatsapp": "1234567890",
    "password": "123456",
    "cep": "12345-678",
    "state": "SP",
    "city": "São Paulo",
    "neighborhood": "Downtown",
    "street": "123 Some Street",
    "latitude": -23.6814346,
    "longitude": -46.9249675
  }
  ```

### 🔐 Autenticar Organização

- **Descrição:** Realiza o login de uma organização existente.
- **Método:** `POST`
- **URL:** `/orgs/auth`
- **Corpo da Requisição:**

  ```json
  {
    "email": "john.doe@example.com",
    "password": "123456"
  }
  ```

- **Exemplo de Resposta:**  

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
  }
  ```

### 📍 Buscar Organizações Próximas

- **Descrição:** Localiza organizações com base na localização.
- **Método:** `GET`
- **URL:** `/orgs/nearby`

- **Parâmetros de Consulta (Query Params):**
    - `latitude` (number, required) - Latitude atual do usuário (deve estar entre -90 e 90).
    - `longitude` (number, required) - Longitude atual do usuário (deve estar entre -180 e 180).

- **Exemplo de Requisição:**

    ```http
    GET /orgs/nearby?latitude=-23.6814346&longitude=-46.9249675
    ```

- **Exemplo de Resposta:**

    ```json
    {
        "orgs": [
            {
                "id": "d317448a-393c-4250-b37b-0151afabe25c",
                "name": "Example Organization",
                "owner": "John Doe",
                "email": "john.doe@example.com",
                "whatsapp": "1234567890",
                "cep": "12345-678",
                "state": "SP",
                "city": "São Paulo",
                "neighborhood": "Downtown",
                "street": "123 Some Street",
                "latitude": "-23.6814346",
                "longitude": "-46.9249675"
            },
            {
                "id": "d3da8e0c-943f-443a-8124-927f436e6540",
                "name": "Some Org",
                "owner": "John Doe",
                "email": "john.doe@org.com",
                "whatsapp": "1234567890",
                "cep": "12345-678",
                "state": "SP",
                "city": "São Paulo",
                "neighborhood": "Downtown",
                "street": "123 Some Street",
                "latitude": "-23.6814346",
                "longitude": "-46.9249675"
            }
        ]
    }
    ```

### 🐕 Criar Pet

- **Descrição:** Cadastra um novo pet para adoção.
- **Método:** `POST`
- **URL:** `/orgs/pets`
- **Corpo da Requisição:**  

  ```json
    {
        "name": "Buddy",
        "about": "Friendly and energetic dog looking for a home.",
        "age": "young",
        "size": "medium",
        "species": "dog",
        "environment": "indoor",
        "energy_level": "high",
        "independence_level": "low"
    }
  ```

### 🔍 Buscar Pets

- **Descrição:** Realiza uma busca por pets disponíveis para adoção.
- **Método:** `GET`
- **URL:** `/orgs/pets`
- **Parâmetros de Consulta (Query Params):**
  - `city` (string, required): Cidade onde o pet está disponível para adoção.
  - `age` (string, optional): Faixa etária do pet para filtrar (ex: filhote, jovem, adulto).
  - `size` (string, optional): Tamanho do pet para filtrar (ex: pequeno, médio, grande).
  - `species` (string, optional): Espécie do pet (ex: cachorro, gato).
  - `environment` (string, optional): Ambiente em que o pet se adapta (ex: interno, externo)
  - `energy_level` (string, optional): Nível de energia do pet (ex: baixo, médio, alto).
  - `independence_level` (string, optional): Nível de independência do pet (ex: baixo, médio, alto).

- **Exemplo de Requisição:**

  ```http
  GET /pets/search?city=São Paulo
  ```

- **Exemplo de Resposta:**  

  ```json
    {
        "pets": [
            {
                "id": "2cd95dfe-2a11-458d-acff-f2dd0d4f1f66",
                "name": "Buddy",
                "about": "Friendly and energetic dog looking for a home.",
                "age": "young",
                "size": "medium",
                "species": "dog",
                "environment": "indoor",
                "energy_level": "high",
                "independence_level": "low",
                "org_id": "d317448a-393c-4250-b37b-0151afabe25c"
            }
        ]
    }
  ```

### 🦮 Buscar Informações de um Pet

- **Descrição:** Exibe informações detalhadas sobre um pet específico.
- **Método:** `GET`
- **URL:** `/orgs/pets/:petId`

- **Exemplo de Resposta:**  

  ```json
    {
        "id": "2cd95dfe-2a11-458d-acff-f2dd0d4f1f66",
        "name": "Buddy",
        "about": "Friendly and energetic dog looking for a home.",
        "age": "young",
        "size": "medium",
        "species": "dog",
        "environment": "indoor",
        "energy_level": "high",
        "independence_level": "low",
        "org_id": "d317448a-393c-4250-b37b-0151afabe25c"
    }
  ```

## 🔐 Autenticação

As rotas da API estão protegidas por autenticação **JWT** (JSON Web Token). Para acessar as rotas que requerem autenticação, é necessário obter um token de acesso.

### Como se autenticar

1. **Faça a autenticação** com suas credenciais (whatsapp e senha) na rota `/orgs/auth` para obter um token JWT:

    - **Método**: `POST`
    - **URL**: `/orgs/auth`
    - **Corpo da Requisição:**

    ```json
    {
        "email": "john.doe@example.com",
        "password": "123456"
    }
    ```

    - **Resposta**:

    ```json
    {
        "token": "your_token"
    }
    ```

2. **Utilize o token** nas requisições às rotas protegidas, incluindo-o no Postman (ou outro API Client) da seguinte forma:

    - No Postman, vá até a aba **Authorization**.
    - Selecione o tipo **Bearer Token**.
    - No campo **Token**, adicione o valor do token recebido.

## 🧪 Testes

Este projeto inclui **testes unitários** e **testes E2E** (end-to-end) para garantir a confiabilidade e o funcionamento correto dos recursos implementados. Para executar os testes, utilize os seguintes comandos:

- **Executar testes unitários:**

  ```bash
  npm run test
  ```

- **Executar testes unitários em modo de observação:**

  ```bash
  npm run test:watch
  ```

- **Preparar o ambiente do Prisma antes dos testes E2E:**

  ```bash
  npm run pretest:e2e
  ```

- **Executar testes E2E:**

  ```bash
  npm run test:e2e
  ```

- **Executar testes E2E em modo de observação:**

  ```bash
  npm run test:e2e:watch
  ```

- **Executar testes com cobertura:**

  ```bash
  npm run test:coverage
  ```

- **Executar a interface do usuário do Vitest:**

  ```bash
  npm run test:ui
  ```

## ⚙️ GitHub Actions

O projeto utiliza o **GitHub Actions** para automação de testes, garantindo qualidade contínua no desenvolvimento. Os **testes unitários** são executados automaticamente a cada ``push`` para o repositório, enquanto os **testes E2E** são acionados em cada ``pull request``. Essa configuração assegura que todas as alterações sejam validadas, promovendo um fluxo de trabalho eficiente e livre de erros.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests com melhorias ou correções. 🚀

## 📝 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## 📞 Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joschonarth/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:joschonarth@gmail.com)