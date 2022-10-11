import { setValue, Token } from '../../config/redis';
const User = require('../../models/user');
function Hash(data) {
  const crypto = require('crypto');
  const ret = crypto
    .createHash('sha256')
    .update(String(data) + process.env.HASH)
    .digest('hex');
  return ret;
}
const Login = async (req, res) => {
  try {
    var user = await User.findOne({
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
    const access = Token().Access(user);
    const refresh = Token().Refresh(user);
    setValue(access, refresh); //key: access , value: refresh if Access Token expired access to redis server
    return res.status(200).json({
      status: 200,
      access: access,
      message: `${user.email} signed in successfully`,
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
};

export default Login;
