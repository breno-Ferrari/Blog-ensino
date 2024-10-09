import express from 'express';
import router from './routes';
import sequelize from './config/database';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger_output.json';

const app = express();

app.use(express.json());
app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

sequelize.sync({ alter: true }).then(() => {
  console.log('Models synchronized with the database');
}).catch((error) => {
  console.error('Error syncing models with the database', error);
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
