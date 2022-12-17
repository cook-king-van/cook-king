import Recipe from '../../models/recipe';
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const recipe = await Recipe.findByIdAndDelete(recipeId);
    if (!recipe) {
      return res.status(400).send(`There is no recipe`);
    }
    return res.send(`Recipe deleted`);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default deleteRecipe;
