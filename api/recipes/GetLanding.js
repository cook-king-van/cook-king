import Recipe from '../../models/recipe';
import categories from '../../models/categories';
const GetLanding = async (req, res) => {
  try {
    const start = new Date() - 86400000;
    const BestRecipe = await Recipe.find({
      createdAt: { $gte: start },
      $orderby: { likeCount: -1 },
    })
      .limit(5)
      .select('_id recipeName likeCount recipeImage');
    if (BestRecipe.length < 5) {
      const supplyRecipe = await Recipe.find({
        $orderby: { likeCount: -1 },
      })
        .limit(5)
        .select('_id recipeName likeCount');
      for (let index = 0; index < supplyRecipe.length; index++) {
        if (BestRecipe.length == 5) {
          break;
        }
        BestRecipe.push(supplyRecipe[index]);
      }
    }
    const OptionRecipes = await categories.Option.find()
      .select('recipeId -_id sort')
      .populate({
        path: 'recipeId',
        options: {
          limit: 5,
          sort: { createdAt: -1 },
        },
        select: ['recipeName', 'recipeImage', 'likeCount', 'recipeImage'],
      });
    if (!OptionRecipes) {
      return res.status(403).send('No items');
    }
    return res.send({
      best: BestRecipe,
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
