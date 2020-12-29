const bodyParser = require('body-parser');

const middleware = (app) => {
  bodyParser.urlencoded({ extended: false });
  app.use(bodyParser.json());
};

module.exports = middleware;
