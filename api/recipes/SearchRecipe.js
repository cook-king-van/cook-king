import Recipe from '../../models/recipe';
const SearchRecipe = async (req, res) => {
  try {
    const query = req.query;
    const IncludeWords = new RegExp(query.name, 'i'); //Parse Include words
    const recipes = await Recipe.find({
      recipeName: {
        $regex: IncludeWords,
      },
    });
    res.status(200).send(recipes);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default SearchRecipe;
