const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('DB connected')
);

// Routes
const routes = require('./routes/index');

// Middleware
bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json());
app.use('/api', routes);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('....ready'));
