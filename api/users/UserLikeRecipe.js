import User from '../../models/user';

const UserLikeRecipe = async (req, res) => {
    try {
    const Id = req.params.userId;
    const recipes = await User.findById(Id).select('likes -_id');
    return res.status(200).send(recipes);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default UserLikeRecipe;
