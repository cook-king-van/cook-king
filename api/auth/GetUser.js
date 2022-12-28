import User from '../../models/user';

const GetUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .select('-password -createdAt -__v')
      .populate('recipes', 'recipeName recipeImage likeCount updatedAt')
      .populate({
        path: 'likes',
        select: ['recipeName', 'likeCount', 'recipeImage', 'userId'],
        populate: {
          path: 'userId',
          select: 'name -_id',
        },
      });
    return res.send(user);
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
