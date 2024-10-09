import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Ensino API',
      version: '1.0.0',
      description: 'API para gerenciamento de posts e usuários no blog',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
