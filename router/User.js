import express from 'express';
import UserValid from '../api/auth/UserValid';
import UserRecipe from '../api/users/UserRecipe';
import UserLikeRecipe from '../api/users/UserLikeRecipe';
import EditUserinfo from '../api/users/EditUserinfo';
import GetUserById from '../api/users/GetUserById';

const router = express.Router();

router.get('/:userId/recipes', UserRecipe);
router.get('/:userId/likes', UserValid, UserLikeRecipe);
router.put('/', UserValid, EditUserinfo);
router.get('/:userId', UserValid, GetUserById);

export default router;
