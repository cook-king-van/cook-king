import Recipe from '../../models/recipe';
import categories from '../../models/categories';

const searchOption = async (option, page, resultPage) => {
  const recipe = await categories.Option.find({
    sort: option,
  })
    .populate({
      path: 'recipeId',
      select: ['recipeName', 'likeCount', 'recipeImage', 'time'],
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
  const FindRecipes = await Recipe.find({
    // Using regex include name
    recipeName: {
      $regex: name,
      $options: 'i',
    },
  })
    .select('recipeName recipeImage likeCount userId time')
    .populate('userId', 'name -_id')
    .skip(resultPage * page)
    .limit(resultPage);
  const recipes = [...FindRecipes];
  if (FindRecipes.length < resultPage) {
    const addRecipeNumber = resultPage - FindRecipes.length;
    let skipNumber = 0;
    if (currentpage) {
      skipNumber = remain + (page - currentpage) * resultPage;
    } else {
      currentpage = page;
      remain = addRecipeNumber;
    }
    const TagRecipes = await categories.Tag.find({
      tagName: {
        $regex: name,
        $options: 'i',
      },
    })
      .select('recipeId -_id')
      .populate({
        path: 'recipeId',
        select: ['recipeName', 'likeCount', 'recipeImage', 'time'],
        populate: {
          path: 'userId',
          select: 'name -_id',
        },
      })
      .skip(skipNumber)
      .limit(addRecipeNumber);
    TagRecipes.forEach((recipe) => {
      if (recipe.recipeId[0] !== undefined) {
        recipes.push(recipe.recipeId[0]);
      }
    });
  }
  return recipes;
};

const searchCategory = async (category, page, resultPage) => {
  const recipe = await categories.Categories.findOne({
    categoriesName: category,
  })
    .populate({
      path: 'recipeList',
      select: ['recipeName', 'likeCount', 'recipeImage', 'time'],
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

const searchQuery = async (query, page, resultPage, currentpage, remain) => {
  const name = query.name;
  const option = query.option;
  const category = query.category;
  if (name) {
    return await searchName(name, page, resultPage, currentpage, remain);
  } else if (option) {
    return await searchOption(option, page, resultPage);
  } else {
    return await searchCategory(category, page, resultPage);
  }
};

const SearchRecipe = async (req, res) => {
  try {
    const { currentpage = 0, remain = 0 } = req.body;
    const query = req.query;
    const page = req.query.page - 1;
    const resultPage = 9; // config number
    const recipes = await searchQuery(
      query,
      page,
      resultPage,
      currentpage,
      remain
    );
    if (recipes.length === 0) {
      return res.status(203).send('There is no searching result');
    }
    return res.status(200).send({ recipes, currentpage,remain });
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
