import { UserService } from './../../../services/UserService';
import { Request, Response } from 'express';
import { UserController } from '../../../controllers/UserController';
import { v4 as uuidv4 } from 'uuid';
import { UserResource } from '../../../resources/UserResource';


// Mock do UserService
jest.mock('../../../services/UserService');

describe('Testes da UserController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock }));
    req = { body: {} };
    res = { status: statusMock } as Partial<Response>;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um usuário com sucesso', async () => {
        const mockUser = new UserResource(
            'user1', 'admin', uuidv4()
        )
        jest.spyOn(UserService.prototype, 'create').mockResolvedValue(mockUser);

        req.body = { username: 'user1', role: 'admin' };

        await UserController.createUser(req as Request, res as Response);

        expect(UserService.prototype.create).toHaveBeenCalledWith('user1', 'admin');
        expect(statusMock).toHaveBeenCalledWith(201);
        expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });

    it('deve retornar um erro ao falhar na criação do usuário', async () => {
        const mockError = new Error('Erro ao criar o usuário');
        jest.spyOn(UserService.prototype, 'create').mockRejectedValue(mockError);

        req.body = { username: 'user1', role: 'admin' };

        await UserController.createUser(req as Request, res as Response);

        expect(UserService.prototype.create).toHaveBeenCalledWith('user1', 'admin');
        expect(statusMock).toHaveBeenCalledWith(500);
    });

    it('deve retornar todos os usuários', async () => {
        const mockUsers = [
            new UserResource('user1', 'admin', uuidv4()),
            new UserResource('user2', 'user', uuidv4())
        ];
        jest.spyOn(UserService.prototype, 'findAll').mockResolvedValue(mockUsers);

        await UserController.getAllUsers(req as Request, res as Response);

        expect(UserService.prototype.findAll).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockUsers);
    });

    it('deve retornar erro ao buscar todos os usuários', async () => {
        const mockError = new Error('Erro ao buscar o usuário');
        jest.spyOn(UserService.prototype, 'findAll').mockRejectedValue(mockError);

        await UserController.getAllUsers(req as Request, res as Response);

        expect(UserService.prototype.findAll).toHaveBeenCalledTimes(1);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro ao Buscar por Usuarios:', error: expect.any(Error) });
    });

    it('deve retornar um usuário pelo ID', async () => {
        const mockUser = new UserResource(
            'user1', 'admin', uuidv4()
        )
        jest.spyOn(UserService.prototype, 'findById').mockResolvedValue(mockUser);
        const mockId = mockUser.id
        req.params = { id: mockId };

        await UserController.getUserById(req as Request, res as Response);

        expect(UserService.prototype.findById).toHaveBeenCalledWith(mockId);
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });

    it('deve retornar erro 404 quando o usuário não for encontrado', async () => {
        const mockError = new Error('Erro ao buscar o usuário');
        jest.spyOn(UserService.prototype, 'findAll').mockRejectedValue(mockError);


        const mockUser = { id: uuidv4(), username: 'user1', role: 'admin' };
        (UserService.prototype.findById as jest.Mock).mockResolvedValue(null); // Mock do método create
        const mockId = mockUser.id
        req.params = { id: mockId };

        await UserController.getUserById(req as Request, res as Response);

        expect(UserService.prototype.findById).toHaveBeenCalledWith(mockId);
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuario não encontrado' });
    });

    it('deve atualizar um usuário com sucesso', async () => {
        const mockUser = new UserResource(
            'user1', 'admin', uuidv4()
        )
        jest.spyOn(UserService.prototype, 'update').mockResolvedValue(mockUser);
        const mockId = mockUser.id

        req.params = { id: mockId };
        req.body = { username: 'user1', role: 'admin' };

        await UserController.editUser(req as Request, res as Response);

        expect(UserService.prototype.update).toHaveBeenCalledWith(mockId, { username: 'user1', role: 'admin' });
        expect(statusMock).toHaveBeenCalledWith(200);
        expect(jsonMock).toHaveBeenCalledWith(mockUser);
    });

    it('deve retornar erro 404 ao atualizar usuário inexistente', async () => {
        (UserService.prototype.update as jest.Mock).mockResolvedValue(null); // Mock do método create
        const mockId = uuidv4()

        req.params = { id: mockId };
        req.body = { username: 'user1', role: 'admin' };

        await UserController.editUser(req as Request, res as Response);

        expect(UserService.prototype.update).toHaveBeenCalledWith(mockId, { username: 'user1', role: 'admin' });
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuario não encontrado' });
    });

    it('deve retornar erro 404 ao deletar usuário inexistente', async () => {
        const mockError = new Error('Usuário não encontrado');
        jest.spyOn(UserService.prototype, 'delete').mockRejectedValue(mockError);

        req.params = { id: '999' };

        await UserController.deleteUser(req as Request, res as Response);

        expect(UserService.prototype.delete).toHaveBeenCalledWith('999');
        expect(statusMock).toHaveBeenCalledWith(404);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
    });

    it('deve retornar erro ao não conseguir deletar o usuario', async () => {

        const mockError = new Error('Erro ao deletar usuário');
        jest.spyOn(UserService.prototype, 'delete').mockRejectedValue(mockError);
        const id = uuidv4()
        req.params = { id: id };

        await UserController.deleteUser(req as Request, res as Response);

        expect(UserService.prototype.delete).toHaveBeenCalledWith(id);
        expect(statusMock).toHaveBeenCalledWith(500);
        expect(jsonMock).toHaveBeenCalledWith({ message: 'Erro ao deletar usuário', error: 'Erro ao deletar usuário' });
    });
});
