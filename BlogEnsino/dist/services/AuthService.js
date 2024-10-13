"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const buffer_1 = require("buffer");
const UserService_1 = require("./UserService");
const env_1 = require("../env");
const UserResource_1 = require("../resources/UserResource");
const userService = new UserService_1.UserService();
class AuthService {
    async generateToken(auth) {
        const usernameDecode = buffer_1.Buffer.from(auth, "base64").toString(); //decode base64
        const user = await userService.findByUsername(usernameDecode);
        return jsonwebtoken_1.default.sign({
            id: user.id,
            username: user.username,
            role: user.role
        }, env_1.env.SECRET_KEY, {
            expiresIn: '1 day',
        });
    }
    async decodeToken(token) {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.SECRET_KEY);
        return new UserResource_1.UserResource(decoded.username, decoded.role, decoded.id);
    }
    async validateUser(token, role) {
        const user = await this.decodeToken(token);
        if (!user) {
            throw new Error("Usuário não encontrado");
        }
        if (user.role !== role) {
            throw new Error("Usuário sem permissão");
        }
    }
}
exports.AuthService = AuthService;
