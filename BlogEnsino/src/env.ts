import dotenv from 'dotenv';

dotenv.config();

export const env = {
  DATABASE_USER: process.env.DATABASE_USER || '',
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
  DATABASE_HOST: process.env.DATABASE_HOST || '',
  DATABASE_NAME: process.env.DATABASE_NAME || '',
  DATABASE_PORT: process.env.DATABASE_PORT || '5432',
  SECRET_KEY: process.env.SECRET_KEY || '',
};
