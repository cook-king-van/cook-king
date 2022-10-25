import Recipe from '../../models/recipe';
import categories from '../../models/categories';
export const bestSort = async (req, res) => {
  try {
    const recipe = await Recipe.find().sort(['like', 'desc']).limit(5);
    return res.status(200).send(recipe);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export const optionSort = async (req, res) => {
  try {
    const sort = req.params.sort;
    const recipe = await categories.Option.find({
      sort: sort,
    })
      .select('recipeId -_id')
      .sort([['createAt', 'desc']])
      .populate('recipeId', ['recipeName', 'recipeImage', 'steps'])
      .limit(10);
    return res.status(200).send(recipe);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export const categorySort = async (req, res) => {
  try {
    const sort = req.params.sort;
    const recipe = await categories.Categories.find({
      categoriesName: sort,
    })
      .sort(['createAt', 'desc'])
      .select('recipeList -_id')
      .populate('recipeList', ['recipeName', 'recipeImage', 'steps'])
      .limit(10);
    return res.status(200).send(recipe);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
