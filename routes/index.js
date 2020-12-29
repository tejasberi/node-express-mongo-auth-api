const express = require('express');

const app = express();

app.use('/register', require('./register.js'));
app.use('/data', require('./data.js'));
app.use('/login', require('./login.js'));

module.exports = app;
