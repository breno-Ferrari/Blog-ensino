"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserService = void 0;
const AuthService_1 = require("./AuthService");
const authService = new AuthService_1.AuthService();
class ValidateUserService {
    async validateUser(token, role) {
        const user = await authService.decodeToken(token);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        if (user.role !== role) {
            throw new Error("Usuário sem permissão");
        }
    }
}
exports.ValidateUserService = ValidateUserService;
