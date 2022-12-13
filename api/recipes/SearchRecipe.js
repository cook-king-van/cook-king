import Recipe from '../../models/recipe';
import categories from '../../models/categories';
const SearchRecipe = async (req, res) => {
  try {
    const name = req.query.name;
    const FindRecipes = await Recipe.find({
      // Using regex include name
      recipeName: {
        $regex: name,
        $options: 'i',
      },
    })
      .select('recipeName recipeImage likeCount userId')
      .populate('userId', 'name -_id');

    const TagRecipes = await categories.Tag.find({
      tagName: {
        $regex: name,
        $options: 'i',
      },
    })
      .select('recipeId -_id')
      .populate({
        path: 'recipeId',
        select: ['recipeName', 'likeCount', 'recipeImage'],
        populate: {
          path: 'userId',
          select: 'name -_id',
        },
      });
    const recipes = [...FindRecipes];
    TagRecipes.forEach((recipe) => {
      if (recipe.recipeId[0] !== undefined) {
        recipes.push(recipe.recipeId[0]);
      }
    });
    if (recipes.length === 0) {
      return res.status(203).send('There is no searching result');
    }
    return res.status(200).send({ recipes });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default SearchRecipe;

/**
 *  Error Code
 *
 *  401 No Token
 *  402 Token expried
 *  500 Exception Error
 *
 *  Response Code
 *  200 send recipe
 *  203 There is no searching result
 */
