"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const authService = new AuthService_1.AuthService();
class AuthController {
    static async generateToken(req, res) {
        try {
            if (req.headers.authorization) {
                const token = await authService.generateToken(req.headers.authorization);
                res.status(201).setHeader("Authorization", token).json();
            }
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao gerar o Token" });
        }
    }
}
exports.AuthController = AuthController;
