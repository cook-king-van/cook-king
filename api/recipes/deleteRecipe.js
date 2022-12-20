import Recipe from '../../models/recipe';
import categories from '../../models/categories';
import User from '../../models/user';
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    const optionId = recipe.option;
    const tagIds = recipe.tags;

    await categories.Option.findByIdAndUpdate(optionId, {
      $pull: {
        recipeId: recipeId,
      },
    });

    if (tagIds.length) {
      tagIds.forEach(async (tag) => {
        await categories.Tag.findByIdAndUpdate(tag, {
          $pull: {
            recipeId: recipeId,
          },
        });
      });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: {
        recipes: recipeId,
      },
    });

    if (!recipe) {
      return res.status(404).send(`Recipe already deleted`);
    }
    const recipes = await Recipe.findByIdAndDelete(recipeId);
    if (!recipes) {
      return res.status(400).send(`There is no recipe`);
    }
    return res.send(`Recipe deleted`);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default deleteRecipe;
