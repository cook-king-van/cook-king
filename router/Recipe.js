import express from 'express';
import CreateRecipe from '../api/foods/PostRecipe';
import GetAllRecipe from '../api/foods/GetAllRecipe';
import UserValid from '../api/auth/UserValid';

const router = express.Router();

router.post('/', UserValid, CreateRecipe);
router.get('/', UserValid, GetAllRecipe);

export default router;
