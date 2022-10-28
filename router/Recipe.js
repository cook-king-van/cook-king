import express from 'express';
import CreateRecipe from '../api/recipes/PostRecipe';
import GetAllRecipe from '../api/recipes/GetAllRecipe';
import {
  todayBestReceipeSort,
  optionSort,
  categorySort,
} from '../api/recipes/SortRecipe';
import UserValid from '../api/auth/UserValid';

const router = express.Router();

router.post('/', UserValid, CreateRecipe);
router.get('/', UserValid, GetAllRecipe);
router.get('/best', UserValid, todayBestReceipeSort);
router.get('/:sort/tag', UserValid, optionSort);
router.get('/:sort/category', UserValid, categorySort);

export default router;
