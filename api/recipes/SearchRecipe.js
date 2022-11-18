import categories from '../../models/categories';
import Recipe from '../../models/recipe';
// import Tag from '../../models/tag';
const SearchRecipe = async (req, res) => {
  try {
    const name = req.query.name;
    const FindRecipes = await Recipe.find({
      // Using regex include name
      recipeName: {
        $regex: name,
        $options: 'i',
      },
    }).select('recipeName recipeImage likeCount');
    const TagRecipes = await categories.Tag.find({
      tagName: {
        $regex: name,
        $options: 'i',
      },
    })
      .select('-_id -tagName -__v')
      .populate({
        path: 'recipeId',
        select: ['recipeName', 'likeCount'],
      });
    const recipes = FindRecipes.concat(TagRecipes[0].recipeId); // connect two arrays
    res.status(200).send({ recipes });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default SearchRecipe;
