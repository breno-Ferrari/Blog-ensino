# Ensino

> Ensino é um projeto criado para a graduação de PósTech da FIAP. Ele consiste de rotas de API em NodeJS que gerenciam um blog escolar e inclui criação, edição, exclusão e leitura de posts e usuários. 

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente do [NodeJS](https://nodejs.org/pt)
- Você tem uma máquina `<Windows / Linux / Mac>`
- Você instalou o [Docker](https://www.docker.com/)
- Para propósito de testes, é interessante que tenha o [Postman](https://www.postman.com/) instalado

## 🚀 Instalando <ensino>

Para instalar o <ensino>, siga estas etapas:

1. Primeiramente, clone esse repositório:

```bash
git clone https://github.com/Camie-M/ensino.git
```

2. Abra o projeto no seu terminal e abra a pasta correta:

```bash
cd BlogEnsino
```

3. Rode o docker-compose para instalar as dependências necessárias:

```bash
docker-compose up
```

4. Rode o projeto

```bash
npm run dev
```

## ☕ Usando <ensino>

Com o projeto rodando, é possível testá-lo pelo [Postman](https://www.postman.com/) ou ferramentas similares na URL <http://localhost:3001/>

As rotas atualmente disponibilizadas são:
- Criar post: </posts> (POST)
- Listar todos os posts: </posts> (GET)
- Pesquisa de posts: </posts/search> (GET)
- Pegar um post pelo id: </posts/:id> (GET)
- Editar post: </posts/:id> (PUT)
- Deletar post: </posts/:id> (DELETE)
  
- Criar user: </users> (POST)
- Listar todos os users: </users> (GET)
- Pegar um user pelo id: </users/:id> (GET)
- Editar user: </users/:id> (PUT)
- Deletar user: </users/:id> (DELETE)

Para saber mais detalhes sobre os <headers> e os <body> necessários para as rotas em questão, visita a documentação da API.
