import categories from '../../models/categories';
const GetAllCategories = async (req, res) => {
  try {
    const categoriesList = await categories.Categories.find()
      .select('categoriesName -_id')
      // .populate('id', '_id')
      // .populate('name', 'categoriesName');
      .populate({
        path: 'recipeList', 
        select: 'categoriesName'
      })
    return res.status(200).send(categoriesList);
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default GetAllCategories;

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
