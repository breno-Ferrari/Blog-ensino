"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const userService = new UserService_1.UserService();
class UserController {
    static async createUser(req, res) {
        try {
            const { username, role } = req.body;
            const user = await userService.create(username, role);
            res.status(201).json(user);
        }
        catch (error) {
            // console.error('Erro ao criar o usuario:', error);
            res.status(500).json({ message: 'Erro ao criar o usuario:', error: error });
        }
    }
    static async getAllUsers(req, res) {
        try {
            const users = await userService.findAll();
            res.status(200).json(users);
        }
        catch (error) {
            // console.error('Erro Buscar por Usuarios:', error);
            res.status(500).json({ message: 'Erro ao Buscar por Usuarios:', error: error });
        }
    }
    static async getUserById(req, res) {
        try {
            const user = await userService.findById(req.params.id);
            if (user) {
                res.status(200).json(user);
            }
            else {
                res.status(404).json({ message: 'Usuario não encontrado' });
            }
        }
        catch (error) {
            // console.error('Erro ao buscar o usuario:', error);
            res.status(500).json({ message: 'Erro ao buscar o usuario:', error: error });
        }
    }
    static async editUser(req, res) {
        try {
            const updatedUser = await userService.update(req.params.id, req.body);
            if (updatedUser) {
                res.status(200).json(updatedUser);
            }
            else {
                res.status(404).json({ message: 'Usuario não encontrado' });
            }
        }
        catch (error) {
            // console.error('Erro ao buscar Usuario', error);
            res.status(500).json({ message: 'Erro ao buscar Usuario', error: error });
        }
    }
    static async deleteUser(req, res) {
        try {
            await userService.delete(req.params.id);
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        }
        catch (error) {
            // console.error('Erro ao deletar usuário:', error);
            if (error instanceof Error) {
                if (error.message.includes('Usuário não encontrado')) {
                    res.status(404).json({ message: 'Usuário não encontrado' });
                }
                else {
                    res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
                }
            }
            else {
                res.status(500).json({ message: 'Erro desconhecido ao deletar usuário' });
            }
        }
    }
}
exports.UserController = UserController;
