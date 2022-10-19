import Food from '../../models/food';
import Categories from '../../models/categories';
import User from '../../models/user';
const PostFood = async (req, res) => {
  try {
    const user = req.user;
    const categories = await new Categories.Categories({
      categoriesName: req.body.categoriesName,
    }).save();
    const option = await new Categories.Option({
      sort: req.body.option,
    }).save();
    const food = await new Food({
      userId: user._id,
      categoriesId: categories,
      foodName: req.body.foodName,
      ingredient: req.body.ingredient,
      tag: req.body.tag,
      size: req.body.size,
      time: req.body.time,
      option,
      steps: {
        order: 1,
      },
    }).save();
    await Categories.Option.findByIdAndUpdate(option._id, {
      $push: {
        foodId: food._id,
      },
    });
    await Categories.Categories.findByIdAndUpdate(categories._id, {
      $push: {
        foodList: food._id,
      },
    });
    await User.findByIdAndUpdate(user._id, {
      $push: {
        FoodLists: food._id,
      },
    });
    return res.status(200).json({
      status: 200,
      message: `Post Food`,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default PostFood;

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
