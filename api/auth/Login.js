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
    });
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
    delete user.password; //except user password
    delete user.createdAt; //except user Creat Date
    const access = Token().Access(user);
    const refresh = Token().Refresh(user);
    setValue(access, refresh); //key: access , value: refresh if Access Token expired access to redis server
    return res.status(200).json({
      status: 200,
      token: access,
      user:user,
      message: `${user.email} signed in successfully`,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default Login;
