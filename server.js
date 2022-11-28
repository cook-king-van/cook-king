import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db';
import APIrouter from './router/index';
import connectRedis from './config/redis';
dotenv.config();
// Connect Database
connectDB();
connectRedis();
const app = express();
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/api', APIrouter);
const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
