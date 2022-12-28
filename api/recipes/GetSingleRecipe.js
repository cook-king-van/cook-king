import Recipe from '../../models/recipe';
const GetSingleRecipe = async (req, res) => {
  try {
    const Id = req.params.recipeId;
    const recipe = await Recipe.findById(Id)
      .select('-userLike -createdAt -updatedAt -__v')
      .populate('userId', 'name profileImage _id')
      .populate('categoriesId', 'categoriesName -_id')
      .populate('option', 'sort -_id')
      .populate('tags', 'tagName _id');
    return res.send(recipe);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default GetSingleRecipe;
