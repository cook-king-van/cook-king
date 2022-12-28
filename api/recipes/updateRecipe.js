import Recipe from '../../models/recipe';
const clear = async (recipeId) => {
  const recipe = await Recipe.findById(recipeId);
  const optionId = recipe.option;
  const tagIds = recipe.tags;
  const categoryId = recipe.categoriesId;
  // Removing recipe id from categories
  await categories.Categories.findByIdAndUpdate(categoryId, {
    $pull: {
      recipeList: recipeId,
    },
  });

  // Removing recipe id from options
  await categories.Option.findByIdAndUpdate(optionId, {
    $pull: {
      recipeId: recipeId,
    },
  });

  // Removing recipe id from tags
  if (tagIds.length) {
    tagIds.forEach(async (tag) => {
      await categories.Tag.findByIdAndUpdate(tag, {
        $pull: {
          recipeId: recipeId,
        },
      });
      // if tag is empty after deleting recipe id, then remove that tag.
    });
  }
};

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

const updateRecipe = async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    clear(recipeId);
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

    const findCategory = await Categories.Categories.findOne({
      categoriesName: categoriesName,
    });
    const findOption = await Categories.Option.findOne({
      sort: option,
    });
    const steps = req.body.step.map((e, index) => {
      return { ...e, order: index + 1 };
    });

    await MakingTag(tags);

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
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default updateRecipe;
