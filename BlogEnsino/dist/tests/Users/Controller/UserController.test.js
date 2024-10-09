"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("./../../../services/UserService");
const UserController_1 = require("../../../controllers/UserController");
const uuid_1 = require("uuid");
const UserResource_1 = require("../../../resources/UserResource");
// Mock do UserService
jest.mock('../../../services/UserService');
describe('Testes da UserController', () => {
    let req;
    let res;
    let jsonMock;
    let statusMock;
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    req = { body: {} };
    res = { status: statusMock };
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('deve criar um usuário com sucesso', async () => {
        const mockUser = new UserResource_1.UserResource('user1', 'admin', (0, uuid_1.v4)());
        jest.spyOn(UserService_1.UserService.prototype, 'create').mockResolvedValue(mockUser);
        req.body = { username: 'user1', role: 'admin' };
        await UserController_1.UserController.createUser(req, res);
        expect(UserService_1.UserService.prototype.create).toHaveBeenCalledWith('user1', 'admin');
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });
    it('deve retornar um erro ao falhar na criação do usuário', async () => {
        const mockError = new Error('Erro ao criar o usuário');
        jest.spyOn(UserService_1.UserService.prototype, 'create').mockRejectedValue(mockError);
        req.body = { username: 'user1', role: 'admin' };
        await UserController_1.UserController.createUser(req, res);
        expect(UserService_1.UserService.prototype.create).toHaveBeenCalledWith('user1', 'admin');
        expect(statusMock).toHaveBeenCalledWith(500);
    });
    it('deve retornar todos os usuários', async () => {
        const mockUsers = [
            new UserResource_1.UserResource('user1', 'admin', (0, uuid_1.v4)()),
            new UserResource_1.UserResource('user2', 'user', (0, uuid_1.v4)())
        ];
        jest.spyOn(UserService_1.UserService.prototype, 'findAll').mockResolvedValue(mockUsers);
        await UserController_1.UserController.getAllUsers(req, res);
        expect(UserService_1.UserService.prototype.findAll).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockUsers);
    });
    it('deve retornar erro ao buscar todos os usuários', async () => {
        const mockError = new Error('Erro ao buscar o usuário');
        jest.spyOn(UserService_1.UserService.prototype, 'findAll').mockRejectedValue(mockError);
        await UserController_1.UserController.getAllUsers(req, res);
        expect(UserService_1.UserService.prototype.findAll).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro ao Buscar por Usuarios:', error: expect.any(Error) });
    });
    it('deve retornar um usuário pelo ID', async () => {
        const mockUser = new UserResource_1.UserResource('user1', 'admin', (0, uuid_1.v4)());
        jest.spyOn(UserService_1.UserService.prototype, 'findById').mockResolvedValue(mockUser);
        const mockId = mockUser.id;
        req.params = { id: mockId };
        await UserController_1.UserController.getUserById(req, res);
        expect(UserService_1.UserService.prototype.findById).toHaveBeenCalledWith(mockId);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });
    it('deve retornar erro 404 quando o usuário não for encontrado', async () => {
        const mockError = new Error('Erro ao buscar o usuário');
        jest.spyOn(UserService_1.UserService.prototype, 'findAll').mockRejectedValue(mockError);
        const mockUser = { id: (0, uuid_1.v4)(), username: 'user1', role: 'admin' };
        UserService_1.UserService.prototype.findById.mockResolvedValue(null); // Mock do método create
        const mockId = mockUser.id;
        req.params = { id: mockId };
        await UserController_1.UserController.getUserById(req, res);
        expect(UserService_1.UserService.prototype.findById).toHaveBeenCalledWith(mockId);
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuario não encontrado' });
    });
    it('deve atualizar um usuário com sucesso', async () => {
        const mockUser = new UserResource_1.UserResource('user1', 'admin', (0, uuid_1.v4)());
        jest.spyOn(UserService_1.UserService.prototype, 'update').mockResolvedValue(mockUser);
        const mockId = mockUser.id;
        req.params = { id: mockId };
        req.body = { username: 'user1', role: 'admin' };
        await UserController_1.UserController.editUser(req, res);
        expect(UserService_1.UserService.prototype.update).toHaveBeenCalledWith(mockId, { username: 'user1', role: 'admin' });
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });
    it('deve retornar erro 404 ao atualizar usuário inexistente', async () => {
        UserService_1.UserService.prototype.update.mockResolvedValue(null); // Mock do método create
        const mockId = (0, uuid_1.v4)();
        req.params = { id: mockId };
        req.body = { username: 'user1', role: 'admin' };
        await UserController_1.UserController.editUser(req, res);
        expect(UserService_1.UserService.prototype.update).toHaveBeenCalledWith(mockId, { username: 'user1', role: 'admin' });
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuario não encontrado' });
    });
    it('deve retornar erro 404 ao deletar usuário inexistente', async () => {
        const mockError = new Error('Usuário não encontrado');
        jest.spyOn(UserService_1.UserService.prototype, 'delete').mockRejectedValue(mockError);
        req.params = { id: '999' };
        await UserController_1.UserController.deleteUser(req, res);
        expect(UserService_1.UserService.prototype.delete).toHaveBeenCalledWith('999');
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });
    it('deve retornar erro ao não conseguir deletar o usuario', async () => {
        const mockError = new Error('Erro ao deletar usuário');
        jest.spyOn(UserService_1.UserService.prototype, 'delete').mockRejectedValue(mockError);
        const id = (0, uuid_1.v4)();
        req.params = { id: id };
        await UserController_1.UserController.deleteUser(req, res);
        expect(UserService_1.UserService.prototype.delete).toHaveBeenCalledWith(id);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro ao deletar usuário', error: 'Erro ao deletar usuário' });
    });
});
