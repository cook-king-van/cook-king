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
          new: true,
        }
      );
      return { _id: newTag._id, tagName: newTag.tagName };
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
const RemoveTag = async (tagIds, recipeId) => {
  tagIds.forEach(async (tag) => {
    await Recipe.findByIdAndUpdate(recipeId, {
      $pull: {
        tags: tag,
      },
    });
  });
};
const UpdateAll = async (recipeId, option, tag, newcate, step) => {
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

    const newOption = await categories.Option.findOneAndUpdate(
      {
        sort: option,
      },
      {
        sort: option,
      },
      {
        upsert: true,
        new: true,
      }
    );

    await Recipe.findByIdAndUpdate(recipeId, {
      option: newOption._id,
    });
  }
  // If category name has changed
  if (findCategory.categoriesName !== newcate) {
    await categories.Categories.findByIdAndUpdate(categoryId, {
      $pull: {
        recipeList: recipeId,
      },
    });

    const newCategory = await categories.Categories.findOneAndUpdate(
      {
        categoriesName: newcate,
      },
      {
        categoriesName: newcate,
      },
      {
        upsert: true,
        new: true,
      }
    );

    await Recipe.findByIdAndUpdate(recipeId, {
      categoriesId: newCategory._id,
    });
  }

  // Removing recipe id from tags
  if (tag && tag.length) {
    tag.forEach((t) => {
      if (tagIds.includes(t)) {
        // already has tag
        tagIds.remove(t);
        tag.remove(t);
      }
    });
    // new tags
    const newTags = await MakingTag(tag);
    console.log('new tags', newTags);
    await addRecipeIdToTag(newTags, recipeId);
    // pull tags
    await RemoveTag(tagIds, recipeId);
    // update tag ids and steps to recipe
    await Recipe.findByIdAndUpdate(recipeId, {
      tags: newTags,
      steps: step,
    });
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
      step,
    } = req.body;
    await UpdateAll(recipeId, option, tags, categoriesName, step);
    const recipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        recipeName,
        recipeImage,
        ingredient,
        time,
        size,
      },
      { new: true }
    );
    return res.send(recipe);
  } catch (e) {
    console.error(`Exception Error: ${e.message}`);
    return res.status(500).send(e.message);
  }
};

export default updateRecipe;
