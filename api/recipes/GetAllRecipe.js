import Recipe from '../../models/recipe';
const GetAllRecipe = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
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
