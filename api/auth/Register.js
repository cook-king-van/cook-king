import crpyto from 'crypto';
import User from '../../models/user';
function EmailValid(data) {
  const RegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/; //Email Valid
  return RegExp.test(data);
}

function PasswordValid(data) {
  const RegExp = /\w{4,20}$/; //Length 4 ~ 20
  return RegExp.test(data);
}

function Hash(data) {
  const ret = crypto
    .createHash('sha256')
    .update(String(data) + process.env.HASH)
    .digest('hex');
  return ret;
}

const Register = async (req, res) => {
  //     BodyData : email , password , passwordconfirm
  try {
    if (
      !EmailValid(req.body.email) ||
      !PasswordValid(req.body.password) ||
      !PasswordValid(req.body.passwordconfirm)
    ) {
      return res.status(403).json({
        status: 403,
        message: `Email or Password Invalid`,
      });
    }
    if (req.body.passwordconfirm !== req.body.password) {
      return res.status(402).json({
        status: 402,
        message: `Password is not same as PasswordConfirm`,
      });
    }
    const findUser = await User.findOne({
      email: req.body.email,
    });
    if (findUser) {
      //If User already has signed up return error
      return res.status(401).json({
        status: 401,
        message: `User has existed`,
      });
    }
    await new User({
      email: req.body.email,
      password: Hash(req.body.password),
    }).save();

    return res.status(200).json({
      status: 200,
      message: `${req.body.email} has signed successfully`,
    });
  } catch (e) {
    console.error(e);
    if (e.status === 403) {
      console.log(`Email Invalid`);
    } else if (e.status === 402) {
      console.log(`Password is not same as PasswordConfirm`);
    } else if (e.status === 401) {
      console.log(`User has existed`);
    }
  }
};

export default Register;
