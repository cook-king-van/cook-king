import Recipe from '../../models/recipe';
import Categories from '../../models/categories';
import User from '../../models/user';
const CreateRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    let { recipeName, ingredient, tag, time, option, categoriesName, size } =
      req.body;
    option = option ?? 'none';
    const categories = await Categories.Categories.findOneAndUpdate(
      {
        categoriesName: categoriesName,
      },
      {
        categoreisName: categoriesName,
      },
      {
        new: true,
        upsert: true,
      }
    );
    const findOption = await Categories.Option.findOne({
      sort: option,
    });
    const steps = [];
    req.body.step.forEach((e, index) => {
      //Json Parse
      const json = JSON.parse(e);
      json.order = index + 1; //order
      steps.push(json);
    });
    const recipe = await new Recipe({
      userId,
      categoriesId: categories._id,
      recipeName,
      ingredient,
      tag,
      size,
      time,
      option: findOption._id,
      steps,
    }).save();
    await Categories.Option.findByIdAndUpdate(findOption._id, {
      $push: {
        recipeId: recipe._id,
      },
    });
    await Categories.Categories.findByIdAndUpdate(categories._id, {
      $push: {
        recipeList: recipe._id,
      },
    });
    await User.findByIdAndUpdate(userId, {
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
