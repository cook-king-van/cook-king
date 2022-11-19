import User from '../../models/user';
import { createHash } from 'crypto';
import { Token, setValue } from '../../config/redis';
const EmailValid = (data) => {
  const RegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/; //Email Valid
  return RegExp.test(data);
};

const PasswordValid = (data) => {
  const RegExp = /\w{4,20}$/; //Length 4 ~ 20
  return RegExp.test(data);
};

const Hash = (data) => {
  const ret = createHash('sha256')
    .update(String(data) + process.env.HASH)
    .digest('hex');
  return ret;
};

const Register = async (req, res) => {
  //     BodyData : email , password , passwordconfirm
  try {
    const { email, password, passwordconfirm } = req.body;
    if (
      !EmailValid(email) ||
      !PasswordValid(password) ||
      !PasswordValid(passwordconfirm)
    ) {
      return res.status(403).json({
        status: 403,
        message: `Email or Password Invalid`,
      });
    }
    if (passwordconfirm !== password) {
      return res.status(402).json({
        status: 402,
        message: `Passwords don't match`,
      });
    }
    const findUser = await User.findOne({
      email,
    });
    if (findUser) {
      //If User already has signed up return error
      return res.status(401).json({
        status: 401,
        message: `User already exists`,
      });
    }
    const userName = email.split('@')[0];
    await new User({
      email,
      password: Hash(password),
      description: '',
      name: userName,
    }).save();

    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const { _id, name, email, description, recipes, likes } = user;
      delete user.password;
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
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (e) {
    console.error(`Exception Error: ${e.message}`);
    console.log(`error: ${e}`);
    return res.status(500).send(e.message);
  }
};

export default Register;
