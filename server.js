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

app.use('/api', APIrouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  server.use('*', express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on PORT ${port}`));
