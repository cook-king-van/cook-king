import express,{Router} from 'express';
import Auth from "../api/auth/Auth";
import Login from "../api/auth/Login";
import Register from "../api/auth/Register";

const router = express.Router();
router.post('/login', Login);
router.post('/register', Register);
router.get('/user', Auth);

export default router