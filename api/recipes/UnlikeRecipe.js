import Recipe from '../../models/recipe';
import User from '../../models/user';
const UnlikeRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = req.user.name;
    const Id = req.params.recipeId;
    const ret = await Recipe.findOneAndUpdate(
      {
        _id: Id,
        userLike: {
          $in: userId,
        },
      },
      {
        $pull: {
          userLike: userId,
        },
        $inc: {
          likeCount: -1,
        },
      }
    );
    if (!ret) {
      return res.status(403).send(`${userName} already unliked ${Id} recipe`);
    }
    await User.findByIdAndUpdate(userId, {
      $pull: {
        likes: Id,
      },
    });
    return res.status(200).send(`${userName} unliked ${Id} recipe`);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default UnlikeRecipe;

/**
 *  Error Code
 *
 *  401 No Token
 *  402 Token expried
 *  403 Already Unliked
 *  500 Exception Error
 *
 *  Response Code
 *  200
 */
