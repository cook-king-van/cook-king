import express from 'express';
import GetUser from '../api/auth/GetUser';
import Login from '../api/auth/Login';
import Register from '../api/auth/Register';
import TokenPublish from '../api/auth/TokenPublish';

const router = express.Router();

router.post('/login', Login);
router.post('/register', Register);
router.get('/user', GetUser);
router.get('/token', TokenPublish);

export default router;
