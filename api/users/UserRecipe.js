import User from '../../models/user';

const UserRecipe = async (req, res) => {
  try {
    const Id = req.params.userId;
    const recipes = await User.findById(Id)
      .select('recipes')
      .populate('recipes', 'recipeName recipeImage updatedAt likeCount');
    return res.status(200).send(recipes);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default UserRecipe;
