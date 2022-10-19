import express from 'express';
import PostFood from '../api/foods/PostFood';
import GetAllFood from '../api/foods/GetAllFood';
import UserValid from '../api/auth/UserValid';
const router = express.Router();

router.post('/', UserValid, PostFood);
router.get('/', UserValid, GetAllFood);

export default router;
