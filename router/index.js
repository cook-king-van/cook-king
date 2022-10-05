import express,{Router} from 'express'
import AuthRouter from './Auth';

const router = express.Router();

router.use('/auth', AuthRouter);

export default router;