import User from '../../models/user';

const EditUserinfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, description, profileImage } = req.body;
    const nameRet = await User.findOne({
      name: name,
    });
    if (nameRet && nameRet._id.toString() !== userId) {
      return res.status(403).send(`Name already exist`);
    }
    const user = await User.findByIdAndUpdate(userId, {
      name,
      description,
      profileImage,
    });
    return res.status(200).send(user);
  } catch (e) {
    console.error(`Exception Error: ${e.message}`);
    return res.status(500).send(e.message);
  }
};

export default EditUserinfo;
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
