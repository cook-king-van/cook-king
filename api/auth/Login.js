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
    const { _id, name, email, description, recipes, likes } = user;
    const access = Token().Access({ _id, name });
    const refresh = Token().Refresh({ _id, name });
    setValue(access, refresh); //key: access , value: refresh if Access Token expired access to redis server
    return res.status(200).json({
      token: access,
      _id,
      name,
      email,
      description,
      recipes,
      likes,
      message: `${name} signed in successfully`,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default Login;
