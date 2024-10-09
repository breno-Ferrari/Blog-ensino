import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const userRoutes: Router = Router();

userRoutes.post('/', UserController.createUser);
userRoutes.get('/', UserController.getAllUsers);
userRoutes.get('/:id', UserController.getUserById);
userRoutes.put('/:id', UserController.editUser);
userRoutes.delete('/:id', UserController.deleteUser);

export default userRoutes;
