import { Router } from 'express';
import UserRoutes from './UserRoutes';
import PostRoutes from './PostRoutes';
import AuthRoutes from './AuthRoutes';



const router: Router = Router();

router.use('/users', UserRoutes);
router.use('/posts', PostRoutes);
router.use('/auth', AuthRoutes);

export default router;
