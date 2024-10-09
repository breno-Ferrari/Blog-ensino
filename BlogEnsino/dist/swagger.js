"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
console.log((0, swagger_jsdoc_1.default)(swaggerOptions));
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
};
exports.setupSwagger = setupSwagger;
