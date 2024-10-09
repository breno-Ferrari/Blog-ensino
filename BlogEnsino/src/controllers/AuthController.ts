import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
    static async generateToken(req: Request, res: Response): Promise<void> {
        try {
            if (req.headers.authorization) {
                const token = await authService.generateToken(req.headers.authorization);
                res.status(201).setHeader("Authorization", token).json();
            }
        } catch (error) {
            res.status(500).json({ message: "Erro ao gerar o Token" });
        }
    }
}
