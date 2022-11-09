import User from '../../models/user';
const GetUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password -createdAt');
    if (!user) {
      return res.status(403).send('No user');
    }
    const { _id, name, email, description, recipes, likes } = user;
    return res.status(200).send({
      _id,
      name,
      email,
      description,
      recipes,
      likes,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default GetUserById;

/**
 *  Error Code
 *
 *  401 No Token
 *  402 Token expried
 *  403 No user
 *  500 Exception Error
 *
 *  Response Code
 *  200
 */
