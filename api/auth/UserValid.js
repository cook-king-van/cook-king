import { Token } from '../../config/redis';
const UserValid = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: `There is no Token`,
      });
    }
    const data = Token().AccessVerify(token);
    if (!data) {
      return res.status(402).json({
        status: 402,
        message: `Token expired`,
      });
    }
    req.user = data.payload;
    next();
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default UserValid;
