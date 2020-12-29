const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AppMiddlewares = require('./middleware/appMiddleware');
const routes = require('./routes/index');

dotenv.config();

// connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('DB connected')
);

// Middleware & routes
AppMiddlewares(app);
app.use('/api', routes);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('....ready'));
