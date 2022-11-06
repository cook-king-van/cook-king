import Recipe from '../../models/recipe';
import User from '../../models/user';
const LikeRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = req.user.name;
    const Id = req.params.recipeId;
    const ret = await Recipe.findOneAndUpdate(
      {
        _id: Id,
        userLike: {
          $nin: userId,
        },
      },
      {
        $push: {
          userLike: userId,
        },
        $inc: {
          likeCount: 1,
        },
      }
    );
    if (!ret) {
      return res.status(403).send(`${userName} already liked ${Id} recipe`);
    }
    await User.findByIdAndUpdate(userId, {
      $push: {
        likes: Id,
      },
    });
    return res.status(200).send(`${userName} liked ${Id} recipe`);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default LikeRecipe;

/**
 *  Error Code
 *
 *  401 No Token
 *  402 Token expried
 *  403 Already Liked
 *  500 Exception Error
 *
 *  Response Code
 *  200
 */
