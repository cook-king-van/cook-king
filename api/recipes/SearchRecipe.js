import Recipe from '../../models/recipe';
import categories from '../../models/categories';

const searchOption = async (option, page, resultPage) => {
  const recipe = await categories.Option.find({
    sort: option,
  })
    .populate({
      path: 'recipeId',
      select: ['recipeName', 'likeCount', 'recipeImage', 'time', 'updatedAt'],
      populate: {
        path: 'userId',
        select: 'name -_id',
      },
      skip: page * resultPage,
      limit: resultPage,
    })
    .select('-__v -_id -sort');
  return recipe[0].recipeId;
};
const searchName = async (name, page, resultPage, currentpage, remain) => {
  const recipes = await Recipe.find({
    // Using regex include name
    recipeName: {
      $regex: name,
      $options: 'i',
    },
  })
    .select('recipeName recipeImage likeCount userId time updatedAt')
    .populate('userId', 'name -_id')
    .skip(resultPage * page)
    .limit(resultPage);
  return recipes;
};

const searchCategory = async (category, page, resultPage) => {
  const recipe = await categories.Categories.findOne({
    categoriesName: category,
  })
    .populate({
      path: 'recipeList',
      select: ['recipeName', 'likeCount', 'recipeImage', 'time', 'updatedAt'],
      populate: {
        path: 'userId',
        select: 'name -_id',
      },
      skip: page * resultPage,
      limit: resultPage,
    })
    .select('-__v -_id -categoriesName');
  return recipe.recipeList;
};

const searchBest = async (page, resultPage) => {
  const recipe = await Recipe.find({
    $orderby: { createdAt: 1 },
  })
    .sort({ likeCount: -1 })
    .skip(resultPage * page)
    .limit(resultPage)
    .select('recipeName likeCount recipeImage time')
    .populate({
      path: 'userId',
      select: 'name -_id',
    });
  return recipe;
};

const searchQuery = async (query, page, resultPage, currentpage, remain) => {
  const name = query.name;
  const option = query.option;
  const category = query.category;
  const best = query.best;
  if (name) {
    return await searchName(name, page, resultPage, currentpage, remain);
  } else if (option) {
    return await searchOption(option, page, resultPage);
  } else if (category) {
    return await searchCategory(category, page, resultPage);
  } else if(best !== undefined){
    return await searchBest(page, resultPage);
  }
};

const SearchRecipe = async (req, res) => {
  try {
    let { currentpage = 0, remain = 0 } = req.body;
    const query = req.query;
    console.log(query.best);
    const page = req.query.page - 1;
    const resultPage = 9; // config number
    const recipes = await searchQuery(
      query,
      page,
      resultPage,
      currentpage,
      remain
    );
    if (recipes === undefined || recipes.length === 0) {
      return res.status(203).send('There is no searching result');
    }
    return res.status(200).send({ recipes, currentpage, remain });
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
