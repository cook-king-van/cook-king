import express from 'express';
import UserValid from '../api/auth/UserValid';
import UserRecipe from '../api/users/UserRecipe';
import UserLikeRecipe from '../api/users/UserLikeRecipe';
const router = express.Router();

router.get('/:userId/recipes', UserValid, UserRecipe);
router.get('/:userId/likes', UserValid, UserLikeRecipe);

export default router;
