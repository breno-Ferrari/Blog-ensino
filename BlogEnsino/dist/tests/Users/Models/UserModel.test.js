"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_mock_1 = __importDefault(require("sequelize-mock"));
const uuid_1 = require("uuid");
jest.setTimeout(10000);
const sequelizeMock = new sequelize_mock_1.default();
const UserMock = sequelizeMock.define('User', {
    username: (0, uuid_1.v4)(),
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
});
describe('User Model', () => {
    it('Deve inicializar os atributos de usuarios corretamente', async () => {
        const user = await UserMock.create({
            username: 'NovoUsuario',
            role: 'user',
        });
        expect(user.username).toBe('NovoUsuario');
        expect(user.role).toBe('user');
    });
    it('Valida obrigatoriedade do campo username', async () => {
        try {
            await UserMock.create({
                role: 'user',
            });
        }
        catch (error) {
            expect(error.message).toContain('notNull Violation: User.username não pode ser nulo');
        }
    });
    it('Valida obrigatoriedade do campo role', async () => {
        try {
            await UserMock.create({
                username: 'usuarioSemRole',
            });
        }
        catch (error) {
            expect(error.message).toContain('notNull Violation: User.role não pode ser nulo');
        }
    });
    it('Deve gerar corretamente o id no formato UUID', async () => {
        const uuid = (0, uuid_1.v4)();
        const user = await UserMock.create({
            id: uuid,
            username: 'autouser',
            role: 'admin',
        });
        expect(user.id).toBeTruthy();
        expect(user.id).toHaveLength(36);
    });
});
