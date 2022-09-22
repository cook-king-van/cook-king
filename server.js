import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db';

dotenv.config();

// Connect Database
connectDB();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
