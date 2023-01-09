import Recipe from '../../models/recipe';
import categories from '../../models/categories';
const MakingTag = async (tags) => {
  const tagIds = await Promise.all(
    tags.map(async (tag) => {
      const newTag = await categories.Tag.findOneAndUpdate(
        {
          tagName: tag,
        },
        {
          tagName: tag,
        },
        {
          upsert: true,
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
      await categories.Tag.findByIdAndUpdate(tagId, {
        $push: {
          recipeId: recipeId,
        },
      });
    })
  );
}
const UpdateAll = async (recipeId, option, tag, category) => {
  const recipe = await Recipe.findById(recipeId);
  const optionId = recipe.option;
  const tagIds = recipe.tags;
  const categoryId = recipe.categoriesId;
  const findOption = await categories.Option.findById(optionId);
  const findCategory = await categories.Categories.findById(categoryId);
  // If option name has changed
  if (findOption.sort !== option) {
    // remove from option list
    await categories.Option.findByIdAndUpdate(optionId, {
      $pull: {
        recipeList: recipeId,
      },
    });

    const newOption = await categories.Option.findOne({
      sort: option,
    });

    await categories.Option.findByIdAndUpdate(newOption._id, {
      $push: {
        recipeList: recipeId,
      },
    });

    await Recipe.findByIdAndUpdate(recipeId, {
      option: newOption._id,
    });
  }
  // If category name has changed
  if (findCategory.categoriesName !== category) {
    await categories.Categories.findByIdAndUpdate(categoryId, {
      $pull: {
        recipeList: recipeId,
      },
    });

    const newCategory = await categories.Categories.findOne({
      categoriesName: category,
    });
    await categories.Categories.findByIdAndUpdate(newCategory._id, {
      $push: {
        recipeList: recipeId,
      },
    });
    await Recipe.findByIdAndUpdate(recipeId, {
      categoriesId: newCategory._id,
    });
  }

  // Removing recipe id from tags
  if (tag.length) {
    tagIds.forEach(async (tag) => {
      await categories.Tag.findOne({
        $pull: {
          tagName: tag,
        },
      });
    });
    await MakingTag(tag);
    await addRecipeIdToTag(tagIds, recipeId);
  }
};

const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    const user = req.user.name;
    const {
      recipeName,
      recipeImage,
      ingredient,
      time,
      option,
      categoriesName,
      size,
      tags,
    } = req.body;
    UpdateAll(recipeId, option, tags, categoriesName);
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

    await Recipe.findByIdAndUpdate(recipeId, {});

    const findCategory = await categories.Categories.findOne({
      categoriesName: categoriesName,
    });
    const findOption = await categories.Option.findOne({
      sort: option,
    });
    const steps = req.body.step.map((e, index) => {
      return { ...e, order: index + 1 };
    });

    await MakingTag(tags);

    await categories.Option.findByIdAndUpdate(findOption._id, {
      $push: {
        recipeId: recipe._id,
      },
    });
    await categories.Categories.findByIdAndUpdate(findCategory._id, {
      $push: {
        recipeList: recipe._id,
      },
    });

    await addRecipeIdToTag(tagIds, recipe._id);

    const recipe = await Recipe.findByIdAndUpdate(recipeId, {
      recipeName,
      recipeImage,
      ingredient,
      time,
      option,
      categoriesName,
      size,
      tags,
      steps,
    });
    return res.send(`${user} updated ${recipe.recipeName} recipe`);
  } catch (e) {
    console.error(`Exception Error: ${e.message}`);
    return res.status(500).send(e.message);
  }
};

export default updateRecipe;
