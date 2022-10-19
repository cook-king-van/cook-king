import { Token, setValue } from '../../config/redis';
import User from '../../models/user';
import { createHash } from 'crypto';
function Hash(data) {
  const ret = createHash('sha256')
    .update(String(data) + process.env.HASH)
    .digest('hex');
  return ret;
}
const Login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
    }).select('-createdAt');
    if (!user) {
      return res.status(403).json({
        status: 403,
        message: `User does not exist`,
      });
    }
    user = user.toObject();
    if (Hash(req.body.password) !== user.password) {
      //Hashing
      return res.status(402).json({
        status: 402,
        message: `Passwords don't match`,
      });
    }
    delete user.password;
    const { _id, name, email, description, FoodLists, likeFood } = user;
    const tokenUser = { ...user };
    delete tokenUser.email;
    delete tokenUser.likeFood;
    delete tokenUser.FoodLists;
    const access = Token().Access(tokenUser);
    const refresh = Token().Refresh(tokenUser);
    setValue(access, refresh); //key: access , value: refresh if Access Token expired access to redis server
    return res.status(200).json({
      token: access,
      _id,
      userName: name,
      email,
      description,
      foodLists: FoodLists,
      likeFood,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default Login;
