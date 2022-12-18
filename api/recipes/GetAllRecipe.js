import Recipe from '../../models/recipe';
const GetAllRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find({})
      .select('-userLike -createdAt -updatedAt time -__v')
      .populate('userId', 'name -_id')
      .populate('categoriesId', 'categoriesName -_id')
      .populate('option', 'sort -_id')
      .populate('tags', 'tagName -_id');
    return res.status(200).send(recipes);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default GetAllRecipe;

/**
 *  Error Code
 *
 *  401 No Token
 *  402 Token expried
 *  500 Exception Error
 *
 *  Response Code
 *  200
 */
