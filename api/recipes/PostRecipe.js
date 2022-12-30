import Recipe from '../../models/recipe';
import Categories from '../../models/categories';
import User from '../../models/user';

const MakingTag = async (tags) => {
  const tagIds = await Promise.all(
    tags.map(async (tag) => {
      const newTag = await Categories.Tag.findOneAndUpdate(
        {
          tagName: tag,
        },
        {
          tagName: tag,
        },
        {
          upsert: true,
          new: true,
        }
      );
      return newTag._id;
    })
  );
  return tagIds;
};

async function addRecipeIdToTag(tagIds, recipeId) {
  await Promise.all(
    tagIds.map(async (tagId) => {
      await Categories.Tag.findByIdAndUpdate(tagId, {
        $push: {
          recipeId: recipeId,
        },
      });
    })
  );
}

const CreateRecipe = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      recipeName,
      recipeImage,
      ingredient,
      time,
      option = 'none',
      categoriesName = 'none',
      size,
      tags,
    } = req.body;

    if (!recipeName) {
      return res.status(400).send({ message: 'Please enter recipe name.' });
    }
    if (!ingredient) {
      return res.status(400).send({ message: 'Please add ingredients.' });
    }
    if (!time) {
      return res.status(400).send({ message: 'Please add time.' });
    }
    if (!size) {
      return res
        .status(400)
        .send({ message: 'Please add size.', item: 'size' });
    }

    const findCategory = await Categories.Categories.findOne({
      categoriesName: categoriesName,
    });
    const findOption = await Categories.Option.findOne({
      sort: option,
    });

    const steps = req.body.step.map((e, index) => {
      return { ...e, order: index + 1 };
    });

    const tagIds = await MakingTag(tags);

    const recipe = await new Recipe({
      userId,
      categoriesId: findCategory._id,
      recipeImage,
      recipeName,
      ingredient,
      size,
      time,
      option: findOption._id,
      tags: tagIds,
      steps,
    }).save();

    await Categories.Option.findByIdAndUpdate(findOption._id, {
      $push: {
        recipeId: recipe._id,
      },
    });

    await Categories.Categories.findByIdAndUpdate(findCategory._id, {
      $push: {
        recipeList: recipe._id,
      },
    });

    await addRecipeIdToTag(tagIds, recipe._id);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          recipes: {
            _id: recipe._id,
            recipeName: recipe.recipeName,
            recipeImage: recipe.recipeImage,
            likeCount: recipe.likeCount,
            updatedAt: recipe.updatedAt,
          },
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedUser);
  } catch (e) {
    console.error(`Exception Error`);
    console.log(`error: ${e.message}`);
    return res.status(500).send({ message: e.message });
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
