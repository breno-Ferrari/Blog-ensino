"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const userRoutes = (0, express_1.Router)();
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 */
userRoutes.post('', UserController_1.UserController.createUser);
userRoutes.get('', UserController_1.UserController.getAllUsers);
userRoutes.get('/:id', UserController_1.UserController.getUserById);
userRoutes.put('/:id', UserController_1.UserController.editUser);
userRoutes.delete('/:id', UserController_1.UserController.deleteUser);
exports.default = userRoutes;
