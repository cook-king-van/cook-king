import { Token } from '../../config/redis';
const UserValid = async (req, res, next) => {
  try {
    if (req.headers.authorization.split(' ')[1] === 'null') {
      return res.status(402).json({
        status: 402,
        message: `There is no Token`,
      });
    }
    const token = req.headers.authorization.split(' ')[1];
    const data = Token().AccessVerify(token);
    if (!data) {
      return res.status(401).json({
        status: 401,
        message: `Token expired`,
      });
    }
    req.user = data.payload;
    next();
  } catch (e) {
    console.error(`Exception Error`);
    console.log(e.message);
    return res.status(500).send(e.message);
  }
};
export default UserValid;
