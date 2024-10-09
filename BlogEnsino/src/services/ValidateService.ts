import { UserRepository } from '../repositories/UserRepository';
import { AuthService } from './AuthService';

const authService = new AuthService()

export class ValidateUserService {
    async validateUser(token: string, role: string): Promise<void> {
        const user = await authService.decodeToken(token)
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        if (user.role !== role) {
            throw new Error("Usuário sem permissão");
        }
    }

}
