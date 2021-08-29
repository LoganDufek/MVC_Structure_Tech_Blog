// Necesseary requirements to set up Express and Handlebars
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3005;

//Sequelize configuration setup
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
  secret: 'Cookie Secret is not',
  cookie: {
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

//Establish the defaults for the code, that it uses handlebars and where the public file is located
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
