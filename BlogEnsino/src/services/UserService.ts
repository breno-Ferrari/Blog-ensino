import { UserResource } from '../resources/UserResource';
import { UserRepository } from '../repositories/UserRepository';
import { UserMapper } from '../mappers/UserMapper';

const userRepository = new UserRepository();

export class UserService {

    public async create(username: string, role: string): Promise<UserResource> {
        try {
            await this.validateUsername(username);
            const createdUser = await userRepository.create(username, role)
            return UserMapper.mapToResource(createdUser)
        } catch (error) {
            throw new Error(`Não foi possível criar o usuário: ${error}`);
        }
    }

    async findAll(): Promise<UserResource[]> {
        try {
            const users = await userRepository.findAll();
            if (users === null || users.length == 0) throw new Error("Não existe usuarios na tabela");
            const usersArray = users.map(user => UserMapper.mapToResource(user));
            return usersArray
        } catch (error) {
            throw new Error(`Não foi possível encontrar os usuários: ${error}`);
        }
    }

    async findById(id: string): Promise<UserResource> {
        try {
            const user = await this.findUserById(id)
            return UserMapper.mapToResource(user)

        } catch (error) {
            throw new Error(`Não foi possível encontrar o usuário: ${error}`);
        }
    }

    async findByUsername(username: string): Promise<UserResource> {
        const user = await this.findUserByUsername(username)
        return UserMapper.mapToResource(user)
    }


    async update(id: string, updatedFields: { username: string; role: string }): Promise<UserResource | null> {
        try {
            const user = await this.findUserById(id);
            await this.validateUsername(updatedFields.username)
            const updatedUser = await userRepository.update(user, updatedFields);
            return UserMapper.mapToResource(updatedUser);
        } catch (error) {
            throw new Error(`Não foi possível atualizar o usuário: ${error}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const user = await this.findUserById(id);
            userRepository.delete(user)
        } catch (error) {
            throw new Error(`Não foi possível deletar o usuário: ${error}`);
        }
    }

    private async findUserByUsername(username: string) {
        const user = await userRepository.findByUsername(username);
        if (!user) throw new Error(`Usuário não encontrado por username: ${username}`);
        return user;
    }

    private async findUserById(id: string) {
        const user = await userRepository.findById(id);
        if (!user) throw new Error(`Usuário não encontrado por ID: ${id}`);
        return user;
    }

    private async validateUsername(username: string) {
        const user = await userRepository.findByUsername(username);
        if (user) throw new Error("Usuario com este username já existe");
    }
}
