import User from '../../models/user';

const GetUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password -createdAt');
    const { _id, name, email, description, recipes, likes } = user;
    return res.status(200).json({
      _id,
      name,
      email,
      description,
      recipes,
      likes,
    });
  } catch (e) {
    console.error(`Exception Error: ${e.message}`);
    return res.status(500).send(e.message);
  }
};

export default GetUser;

/**
 *  Error Code
 *
 *  401 No Token
 *  402 Token expried
 *  500 Exception Error
 *
 *  Response Code
 *  200
 */
