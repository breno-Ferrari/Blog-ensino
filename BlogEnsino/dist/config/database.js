"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_1 = require("../env");
// Ajuste o caminho conforme necessário
const sequelize = new sequelize_1.Sequelize(env_1.env.DATABASE_NAME, env_1.env.DATABASE_USER, env_1.env.DATABASE_PASSWORD, {
    host: env_1.env.DATABASE_HOST,
    dialect: 'postgres',
    port: parseInt(env_1.env.DATABASE_PORT, 10),
});
exports.default = sequelize;
