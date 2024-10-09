"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    DATABASE_USER: process.env.DATABASE_USER || '',
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
    DATABASE_HOST: process.env.DATABASE_HOST || '',
    DATABASE_NAME: process.env.DATABASE_NAME || '',
    DATABASE_PORT: process.env.DATABASE_PORT || '5432',
    SECRET_KEY: process.env.SECRET_KEY || '',
};
