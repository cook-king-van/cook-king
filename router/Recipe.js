import express from 'express';
import CreateRecipe from '../api/recipes/PostRecipe';
import GetAllRecipe from '../api/recipes/GetAllRecipe';
import {
  todayBestReceipeSort,
  optionSort,
  categorySort,
} from '../api/recipes/SortRecipe';
import UserValid from '../api/auth/UserValid';
import LikeRecipe from '../api/recipes/LikeRecipe';
import GetLanding from '../api/recipes/GetLanding';
import UnlikeRecipe from '../api/recipes/UnlikeRecipe';
const router = express.Router();

router.post('/', UserValid, CreateRecipe);
router.get('/', UserValid, GetAllRecipe);
router.get('/best', UserValid, todayBestReceipeSort);
router.get('/:sort/tag', UserValid, optionSort);
router.get('/:sort/category', UserValid, categorySort);
router.put('/like/:recipeId', UserValid, LikeRecipe);
router.get('/landing',  GetLanding);
router.put('/unlike/:recipeId', UserValid, UnlikeRecipe);

export default router;
