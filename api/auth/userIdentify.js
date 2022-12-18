import Recipe from '../../models/recipe';
const userIdentify = async (req, res, next) => {
  try {
    const recipeId = req.params.recipeId; 
    const userId = req.user._id;
    const recipe = await Recipe.findById(recipeId).select('userId -_id');
    if (userId !== recipe.userId.toString()) {
      return res.status(403).send('Unauthorized');
    }
    next();
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default userIdentify;
