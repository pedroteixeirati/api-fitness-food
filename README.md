# Projeto API de Gerenciamento de Produtos Alimentícios

## 1. Visão Geral
Este projeto é uma API de Gerenciamento de Produtos Alimentícios desenvolvida com NestJS. A API permite a importação de dados do Open Food Facts, oferecendo funcionalidades CRUD para gerenciar produtos alimentícios armazenados em um banco de dados MySQL. Além disso, a API inclui um sistema de monitoramento de saúde que verifica o status da aplicação, a última execução de importação de dados e o uso de recursos do servidor. O projeto segue boas práticas de desenvolvimento, incluindo princípios SOLID, DDD, e testes unitários.

## 2. Estrutura do Projeto

O projeto foi estruturado utilizando módulos para separar as responsabilidades e organizar melhor o código. Os principais módulos são:

### 2.1. Health Module
Este módulo é responsável por monitorar o estado da aplicação. Ele fornece um endpoint que retorna informações sobre a saúde da API, como tempo online, uso de memória, status da conexão com o banco de dados e a última execução do CRON.

### 2.2. Import History Module
Gerencia o histórico de importações de dados do Open Food Facts. Este módulo armazena informações sobre as importações realizadas, como a data e hora da última importação, e é utilizado pelo `HealthModule` para monitorar o status das atualizações de dados.

### 2.3. Products Module
Responsável por todas as operações CRUD relacionadas aos produtos alimentícios. Este módulo inclui funcionalidades para criar, atualizar, excluir e listar produtos, com suporte a paginação para evitar sobrecarga nas requisições.

### 2.4. Scheduler Module
Este módulo gerencia a execução de tarefas agendadas, como a importação diária de dados do Open Food Facts. Ele utiliza o `@nestjs/schedule` para configurar e gerenciar o CRON que realiza essas importações.

---

Cada módulo é organizado com seus próprios controladores, serviços e repositórios, garantindo uma separação clara de responsabilidades e facilitando a manutenção e escalabilidade do projeto.

Descreva a estrutura do projeto, incluindo módulos, serviços, controladores e entidades. Explique a organização e as responsabilidades de cada componente.

## 3. Configuração Inicial

Este guia descreve como configurar o ambiente de desenvolvimento para o projeto API Fitness Food.

### 3.1. Instalação de Dependências

Certifique-se de ter o Node.js instalado na sua máquina. Em seguida, instale as dependências do projeto com o seguinte comando:

```bash
npm install
```

### 3.2. Configuração de Variáveis de Ambiente (.env)

Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis de ambiente:

DB_HOST=localhost
DB_PORT=33061
DB_USERNAME=root
DB_PASSWORD=******
DB_DATABASE=fitness_foods

### 3.3. Execução do Projeto Localmente

Após instalar as dependências e configurar as variáveis de ambiente, você pode executar o projeto localmente usando o seguinte comando:

```bash
npm run start:dev
```

## 4. Desenvolvimento

#### 4.1. Decisões Arquiteturais
- **Módulos:** O projeto foi organizado em módulos separados (`health`, `import-history`, `products`, `scheduler`) para garantir a separação de responsabilidades e facilitar a manutenção do código. Cada módulo contém suas próprias entidades, serviços, controladores e repositórios.
- **TypeORM:** O uso do TypeORM foi escolhido para facilitar a integração com o banco de dados MySQL, aproveitando os recursos de ORM.
- **NestJS:** A escolha pelo NestJS se deve à sua arquitetura modular, que segue os princípios SOLID e DDD, proporcionando um desenvolvimento escalável e de fácil manutenção.


#### 4.2. Implementação de Endpoints
- **GET /health:** Este endpoint fornece informações sobre a saúde da API. A implementação captura o status do cron utilizando o serviço `ImportHistoryService`, além de informações de memória (`process.memoryUsage()`) e tempo de atividade (`process.uptime()`).
- **GET /products:** Este endpoint lista os produtos da base de dados com paginação. Aceita os parâmetros `page` e `limit` para controlar a quantidade de resultados retornados por página.
- **PUT /products/:code:** Atualiza informações de um produto específico com base em seu código.
- **DELETE /products/:code:** Altera o status de um produto específico para "trash", indicando que foi removido logicamente.

## 5. Testes

### 5.1. Testes Unitários
Os testes unitários foram realizados para validar as funcionalidades dos serviços, garantindo o correto comportamento das operações de CRUD. ex:

- **ProductsService**: 
  - Testar o retorno de todos os produtos com paginação.
  - Verificar o comportamento ao buscar um produto específico.
  - Garantir que exceções sejam lançadas corretamente quando um produto não for encontrado.

### 5.3. Validação dos Endpoints via Postman
- **GET /**: Verificar o status da API.
- **GET /products**: Verificar o retorno paginado dos produtos.
- **GET /products/:code**: Testar a recuperação de um produto específico.
- **PUT /products/:code** 
- **DELETE /products/:code**: Validar atualizações e deleções de produtos.
