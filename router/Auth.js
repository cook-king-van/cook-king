import express,{Router} from 'express';
// import GetUser from "../api/auth/GetUser";
// import Login from "../api/auth/Login";
import Register from "../api/auth/Register";

const router = express.Router();
// router.post('/login', Login);
router.post('/register', Register);
// router.get('/user', GetUser);

export default router