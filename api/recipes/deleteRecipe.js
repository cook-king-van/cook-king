import Recipe from '../../models/recipe';
import categories from '../../models/categories';
import User from '../../models/user';
const DeleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId);
    const optionId = recipe.option;
    const tagIds = recipe.tags;
    const categoryId = recipe.categoriesId;

    // Removing recipe id from categories
    await categories.Categories.findByIdAndUpdate(categoryId, {
      $pull: {
        recipeList: recipeId,
      },
    });

    // Removing recipe id from options
    await categories.Option.findByIdAndUpdate(optionId, {
      $pull: {
        recipeId: recipeId,
      },
    });

    // Removing recipe id from tags
    if (tagIds.length) {
      tagIds.forEach(async (tag) => {
        await categories.Tag.findByIdAndUpdate(tag, {
          $pull: {
            recipeId: recipeId,
          },
        });
        // if tag is empty after deleting recipe id, then remove that tag.
      });
    }

    // Removing recipe id from the user
    await User.findByIdAndUpdate(userId, {
      $pull: {
        recipes: recipeId,
      },
    });

    if (!recipe) {
      return res.status(404).send(`Recipe already deleted`);
    }
    // Removing recipe from recipes
    const recipes = await Recipe.findByIdAndDelete(recipeId);
    if (!recipes) {
      return res.status(400).send(`There is no recipe`);
    }
    return res.send(recipeId);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default DeleteRecipe;
