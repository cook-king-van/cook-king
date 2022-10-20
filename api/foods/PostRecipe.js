import Recipe from '../../models/recipe';
import Categories from '../../models/categories';
import User from '../../models/user';
const CreateRecipe = async (req, res) => {
  try {
    const user = req.user;
    const categories = await new Categories.Categories({
      categoriesName: req.body.categoriesName,
    }).save();

    if (!req.body.option) req.body.option = 'none';
    const option = await Categories.Option.findOne({
      sort: req.body.option,
    });

    let steps = [];
    req.body.step.forEach((e, index) => {
      //Json Parse
      const json = JSON.parse(e);
      json.order = index + 1; //order
      steps.push(json);
    });

    const recipe = await new Recipe({
      userId: user._id,
      categoriesId: categories,
      recipeName: req.body.recipeName,
      ingredient: req.body.ingredient,
      tag: req.body.tag,
      size: req.body.size,
      time: req.body.time,
      option: option._id,
      steps,
    }).save();
    await Categories.Option.findByIdAndUpdate(option._id, {
      $push: {
        recipeId: recipe._id,
      },
    });
    await Categories.Categories.findByIdAndUpdate(categories._id, {
      $push: {
        recipeList: recipe._id,
      },
    });
    await User.findByIdAndUpdate(user._id, {
      $push: {
        recipes: recipe._id,
      },
    });
    return res.status(200).json({
      status: 200,
      message: `Post Receipe`,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default CreateRecipe;

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
