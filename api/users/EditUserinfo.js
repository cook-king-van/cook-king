import User from '../../models/user';

const EditUserinfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = req.user.name;
    const { name, description, profileImage } = req.body;
    await User.findByIdAndUpdate(userId, {
      name,
      description,
      profileImage,
    });
    return res.status(200).send(`${userName} profile updated`);
  } catch (e) {
    console.error(`Exception Error`);
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
