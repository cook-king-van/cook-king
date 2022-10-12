import dotenv from 'dotenv';
import { createClient } from 'redis'; //redis version 4.0.6
import jwt from 'jsonwebtoken';
dotenv.config();
const client = createClient({
  socket: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD,
});
const RedisConnect = async () => {
  try {
    // Connect Database
    await client.connect();
    console.log(`Redis Connected: ${process.env.REDIS_URL}`.cyan.underline);
  } catch (e) {
    console.error(e);
  }
};
export const Token = () => {
  return {
    Access(payload) {
      return jwt.sign({ payload }, process.env.ACCESSTOKEN, {
        expiresIn: process.env.ACCESSLIFE,
      });
    },
    Refresh(payload) {
      return jwt.sign({ payload }, process.env.REFRESHTOKEN, {
        expiresIn: process.env.REFRESHLIFE,
      });
    },
    AccessVerify(token) {
      let data = null;
      jwt.verify(
        String(token),
        String(process.env.ACCESSTOKEN),
        function (err, usr) {
          if (!err) {
            data = usr;
          }
        }
      );
      return data;
    },
    RefreshVerify(token) {
      let data = null;
      jwt.verify(
        String(token),
        String(process.env.REFRESHTOKEN),
        function (err, usr) {
          if (!err) {
            //If there is no error
            data = usr;
          }
        }
      );
      return data;
    },
  };
};

export const setValue = async (key, value) => {
  const onehourExpire = 60 * 60;
  await client.set(key, value, {
    //O(1)
    EX: onehourExpire,
  });
};
export const getValue = async (key) => {
  //O(1)
  return client.get(key);
};

export default RedisConnect;
