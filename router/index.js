import express from 'express';
import AuthRouter from './Auth';
import UserRouter from './User';
import FoodFouter from './Food';
const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/foods', FoodFouter);

export default router;