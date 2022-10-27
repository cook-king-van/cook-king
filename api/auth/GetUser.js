const GetUser = async (req, res) => {
  try {
    let token = req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: `There is no Token`,
      });
    }
    const user = Token().AccessVerify(token);
    if (!user) {
      return res.status(402).json({
        status: 402,
        message: `Token expired`,
      });
    }
    return res.status(200).json({
      status: 200,
      user: req.user,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};

export default GetUser;

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
