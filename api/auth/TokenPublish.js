import { Token, getValue, Rename, Logout } from '../../config/redis';
const TokenPublish = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //header token
    if (!token) {
      return res.status(401).send('No Token');
    }
    const refresh = await getValue(token);
    if (!refresh) {
      return res.status(401).send('Need to login');
    }
    const data = await Token().RefreshVerify(refresh);
    if (!data) {
      await Logout(token);
      return res.status(403).send('Refresh Token expired');
    }
    const { _id, name } = data.payload;
    const access = await Token().Access({ _id, name }); //encrypt
    await Rename(token, access); //Change name
    return res.status(200).json({
      token: access,
      message: `Refresh Token published`,
    });
  } catch (e) {
    console.error(`Exception Error`);
    return res.status(500).send(e.message);
  }
};
export default TokenPublish;

/**
 *  Error Code
 *
 *  401 No Token
 *  402 Need to login
 *  403 Refresh Token expired
 *  500 Exception Error
 *
 *  Response Code
 *  200
 */
