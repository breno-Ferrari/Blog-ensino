"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const UserMapper_1 = require("../mappers/UserMapper");
const userRepository = new UserRepository_1.UserRepository();
class UserService {
    async create(username, role) {
        try {
            await this.validateUsername(username);
            const createdUser = await userRepository.create(username, role);
            return UserMapper_1.UserMapper.mapToResource(createdUser);
        }
        catch (error) {
            throw new Error(`Não foi possível criar o usuário: ${error}`);
        }
    }
    async findAll() {
        try {
            const users = await userRepository.findAll();
            if (users === null || users.length == 0)
                throw new Error("Não existe usuarios na tabela");
            const usersArray = users.map(user => UserMapper_1.UserMapper.mapToResource(user));
            return usersArray;
        }
        catch (error) {
            throw new Error(`Não foi possível encontrar os usuários: ${error}`);
        }
    }
    async findById(id) {
        try {
            const user = await this.findUserById(id);
            return UserMapper_1.UserMapper.mapToResource(user);
        }
        catch (error) {
            throw new Error(`Não foi possível encontrar o usuário: ${error}`);
        }
    }
    async findByUsername(username) {
        const user = await this.findUserByUsername(username);
        return UserMapper_1.UserMapper.mapToResource(user);
    }
    async update(id, updatedFields) {
        try {
            const user = await this.findUserById(id);
            await this.validateUsername(updatedFields.username);
            const updatedUser = await userRepository.update(user, updatedFields);
            return UserMapper_1.UserMapper.mapToResource(updatedUser);
        }
        catch (error) {
            throw new Error(`Não foi possível atualizar o usuário: ${error}`);
        }
    }
    async delete(id) {
        try {
            const user = await this.findUserById(id);
            userRepository.delete(user);
        }
        catch (error) {
            throw new Error(`Não foi possível deletar o usuário: ${error}`);
        }
    }
    async findUserByUsername(username) {
        const user = await userRepository.findByUsername(username);
        if (!user)
            throw new Error(`Usuário não encontrado por username: ${username}`);
        return user;
    }
    async findUserById(id) {
        const user = await userRepository.findById(id);
        if (!user)
            throw new Error(`Usuário não encontrado por ID: ${id}`);
        return user;
    }
    async validateUsername(username) {
        const user = await userRepository.findByUsername(username);
        if (user)
            throw new Error("Usuario com este username já existe");
    }
}
exports.UserService = UserService;
