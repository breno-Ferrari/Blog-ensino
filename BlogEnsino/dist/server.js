"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("../swagger_output.json"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(routes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
database_1.default.sync({ alter: true }).then(() => {
    console.log('Models synchronized with the database');
}).catch((error) => {
    console.error('Error syncing models with the database', error);
});
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
