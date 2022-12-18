import Recipe from '../../models/recipe';
const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const user = req.user.name;
    const {
      recipeName,
      recipeImage,
      ingredient,
      time,
      option,
      categoriesName,
      size,
      tags,
    } = req.body;
    const steps = req.body.step.map((e, index) => {
      return { ...e, order: index + 1 };
    });
    const recipe = await Recipe.findByIdAndUpdate(recipeId, {
      recipeName,
      recipeImage,
      ingredient,
      time,
      option,
      categoriesName,
      size,
      tags,
      steps,
    });
    return res.send(`${user} updated ${recipe.recipeName} recipe`);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default updateRecipe;
