import Recipe from '../../models/recipe';
import categories from '../../models/categories';
const GetLanding = async (req, res) => {
  try {
    const start = new Date() - 86400000; // from yesterday sort likeCount asce
    const BestRecipe = await Recipe.find({
      createdAt: { $gte: start },
      $orderby: { likeCount: -1 },
    })
      .limit(5)
      .select('recipeName likeCount recipeImage')
      .populate('userId', 'name');

    const supplyRecipe = await Recipe.find({
      $orderby: { likeCount: -1, createdAt: -1 },
    })
      .limit(5)
      .select('recipeName likeCount recipeImage userId')
      .populate('userId', 'name -_id');
    const best = BestRecipe.concat(supplyRecipe).slice(0, 5);
    const OptionRecipes = await categories.Option.find()
      .select('recipeId -_id sort')
      .populate({
        path: 'recipeId',
        populate: {
          path: 'userId',
        },
        options: {
          limit: 5,
          sort: { likeCount: -1, createdAt: -1 },
        },
        select: ['recipeName', 'recipeImage', 'likeCount', 'userId'],
      });
    if (!OptionRecipes) {
      return res.status(403).send('No items');
    }
    return res.send({
      best,
      brunch: OptionRecipes[0].recipeId,
      snack: OptionRecipes[1].recipeId,
      dinner: OptionRecipes[2].recipeId,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default GetLanding;
/**
 *  Error Code
 *
 *  401 No Token
 *  402 Token expried
 *  403 No Item
 *  500 Exception Error
 *
 *  Response Code
 *  200
 */
