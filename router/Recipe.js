import express from 'express';
import CreateRecipe from '../api/recipes/PostRecipe';
import GetAllRecipe from '../api/recipes/GetAllRecipe';
import {
  todayBestReceipeSort,
  optionSort,
  categorySort,
} from '../api/recipes/SortRecipe';
import UserValid from '../api/auth/UserValid';
import userIdentify from '../api/auth/userIdentify';
import LikeRecipe from '../api/recipes/LikeRecipe';
import GetLanding from '../api/recipes/GetLanding';
import UnlikeRecipe from '../api/recipes/UnlikeRecipe';
import SearchRecipe from '../api/recipes/SearchRecipe';
import GetSingleRecipe from '../api/recipes/GetSingleRecipe';
import deleteRecipe from '../api/recipes/deleteRecipe';
import updateRecipe from '../api/recipes/updateRecipe';
import GetAllCategories from '../api/recipes/GetAllCategories';
const router = express.Router();

router.post('/', UserValid, CreateRecipe);
router.get('/', GetAllRecipe);
router.get('/best', todayBestReceipeSort);
router.get('/:sort/tag', optionSort);
router.get('/:sort/category', categorySort);
router.get('/landing', GetLanding);
router.get('/search', SearchRecipe);
router.get('/categories', GetAllCategories);
router.get('/:recipeId', GetSingleRecipe);
router.put('/like/:recipeId', UserValid, LikeRecipe);
router.put('/unlike/:recipeId', UserValid, UnlikeRecipe);
router.delete('/:recipeId', UserValid, userIdentify, deleteRecipe);
router.put('/:recipeId', UserValid, userIdentify, updateRecipe);

export default router;
