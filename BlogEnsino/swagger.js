const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/routes/index.ts'];

const doc = {
  info: {
    title: 'Blog Ensino API',
    description: 'API para gerenciamento de posts e usuários no blog',
    version: '1.0.0',
  },
  host: 'localhost:3001',
  schemes: ['http'],
  tags: [
    {
      name: 'Posts',
      description: 'Rotas relacionadas aos posts',
    },
    {
      name: 'Users',
      description: 'Rotas relacionadas aos usuários',
    },
    {
      name: 'Auth',
      description: 'Rotas relacionadas à autenticação',
    }
  ],
  paths: {
    '/posts': {
      post: {
        summary: 'Cria um novo post',
        description: 'Essa rota permite criar um novo post no blog',
        tags: ['Posts'],
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            description: 'Token de autorização',
            type: 'string'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  example: 'Título do post'
                },
                text: {
                  type: 'string',
                  example: 'Conteúdo do post'
                }
              }
            }
          }
        ],
        responses: {
          201: { description: 'Post criado com sucesso' },
          400: { description: 'Requisição inválida' },
          403: { description: 'Token inválido ou ausência de permissão' },
          500: { description: 'Erro interno do servidor' }
        }
      },
      get: {
        summary: 'Lista todos os posts',
        description: 'Essa rota retorna uma lista de todos os posts disponíveis no blog',
        tags: ['Posts'],
        responses: {
          200: { description: 'Lista de posts retornada com sucesso' },
          500: { description: 'Erro interno do servidor' }
        }
      }
    },
    '/posts/search': {
      get: {
        summary: 'Busca posts por título',
        description: 'Retorna posts que correspondem ao título especificado',
        tags: ['Posts'],
        parameters: [
          {
            name: 'title',
            in: 'query',
            description: 'Título do post a ser buscado',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: { description: 'Posts retornados com sucesso' },
          404: { description: 'Nenhum post encontrado' },
          500: { description: 'Erro interno do servidor' }
        }
      }
    },
    '/posts/{id}': {
      get: {
        summary: 'Busca um post por ID',
        description: 'Retorna um post específico com base no ID fornecido',
        tags: ['Posts'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do post',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: { description: 'Post encontrado' },
          404: { description: 'Post não encontrado' },
          500: { description: 'Erro interno do servidor' }
        }
      },
      put: {
        summary: 'Edita um post',
        description: 'Atualiza o conteúdo de um post existente',
        tags: ['Posts'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do post',
            required: true,
            type: 'string'
          },
          {
            name: 'authorization',
            in: 'header',
            description: 'Token de autorização',
            required: true,
            type: 'string'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                title: {
                  type: 'string',
                  example: 'Título do post atualizado'
                },
                text: {
                  type: 'string',
                  example: 'Conteúdo do post atualizado'
                }
              }
            }
          }
        ],
        responses: {
          200: { description: 'Post atualizado com sucesso' },
          403: { description: 'Token inválido ou ausência de permissão' },
          404: { description: 'Post não encontrado' },
          500: { description: 'Erro interno do servidor' }
        }
      },
      delete: {
        summary: 'Deleta um post',
        description: 'Remove um post existente',
        tags: ['Posts'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do post',
            required: true,
            type: 'string'
          },
          {
            name: 'authorization',
            in: 'header',
            description: 'Token de autorização',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: { description: 'Post deletado com sucesso' },
          403: { description: 'Token inválido ou ausência de permissão' },
          404: { description: 'Post não encontrado' },
          500: { description: 'Erro interno do servidor' }
        }
      }
    },
    '/users': {
      post: {
        summary: 'Cria um novo usuário',
        description: 'Essa rota permite criar um novo usuário no sistema',
        tags: ['Users'],
        parameters: [
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'nomeDeUsuario'
                },
                role: {
                  type: 'string',
                  example: 'admin'
                }
              }
            }
          }
        ],
        responses: {
          201: { description: 'Usuário criado com sucesso' },
          400: { description: 'Requisição inválida' },
          500: { description: 'Erro interno do servidor' }
        }
      },
      get: {
        summary: 'Lista todos os usuários',
        description: 'Retorna uma lista de todos os usuários cadastrados',
        tags: ['Users'],
        responses: {
          200: { description: 'Lista de usuários retornada com sucesso' },
          500: { description: 'Erro interno do servidor' }
        }
      }
    },
    '/users/{id}': {
      get: {
        summary: 'Busca um usuário por ID',
        description: 'Retorna um usuário específico com base no ID fornecido',
        tags: ['Users'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do usuário',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: { description: 'Usuário encontrado' },
          404: { description: 'Usuário não encontrado' },
          500: { description: 'Erro interno do servidor' }
        }
      },
      put: {
        summary: 'Edita um usuário',
        description: 'Atualiza os dados de um usuário existente',
        tags: ['Users'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do usuário',
            required: true,
            type: 'string'
          },
          {
            name: 'body',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                  example: 'nomeDeUsuarioAtualizado'
                },
                role: {
                  type: 'string',
                  example: 'user'
                }
              }
            }
          }
        ],
        responses: {
          200: { description: 'Usuário atualizado com sucesso' },
          404: { description: 'Usuário não encontrado' },
          500: { description: 'Erro interno do servidor' }
        }
      },
      delete: {
        summary: 'Deleta um usuário',
        description: 'Remove um usuário existente',
        tags: ['Users'],
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'ID do usuário',
            required: true,
            type: 'string'
          }
        ],
        responses: {
          200: { description: 'Usuário deletado com sucesso' },
          404: { description: 'Usuário não encontrado' },
          500: { description: 'Erro interno do servidor' }
        }
      }
    },
    '/auth/token': {
      get: {
        summary: 'Gera um token de autenticação',
        description: 'Retorna um token de autenticação para acessar a API',
        tags: ['Auth'],
        parameters: [
          {
            name: 'authorization',
            in: 'header',
            description: 'Token de autorização',
            required: true,
            type: 'string'
          }
        ],
        responses: {
           201: { description: 'Token gerado com sucesso' },
           500: { description: 'Erro interno do servidor' }
        }
      }
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./dist/server');
});
