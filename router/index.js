import express from 'express';
import AuthRouter from './Auth';
// import UserRouter from './User';
import RecipeRouter from './Recipe';
const router = express.Router();

router.use('/auth', AuthRouter);
// router.use('/users', UserRouter);
router.use('/recipes', RecipeRouter);

export default router;