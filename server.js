//To Install:
const path = require('path');
const express = require('express');
//Creates session middleware. Just session ID saved. Session data stored on server side: 
const session = require('express-session');
//HTML template engine handlebars:
const exphandlebars = require('express-handlebars');

//Pulling in backside routes and the connection:
const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
//Initilize sequelize store with the express sequelize package. This is a sequel session store. The session will start when the user logs in
//And goes until logout or expires. While logged in, all data collected during the session will be stored. Data not shared between sessions
//of different users.
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Initilize express and create the port to listen on:
const app = express();
const PORT = process.env.PORT || 3001;

//Configuring a session object and then setting where it is stored using the SequelizeStore variable we created and the sequelize database:
const sess = {
  secret: 'secret',
  cookie: {
    //session will expire - 10 minutes times 60 seconds in a minute * 1000 ms
    expires: 10 * 60 * 1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//Using the express session as express middleware:
app.use(session(sess));

const handlebars = exphandlebars.create({ helpers });

//Set handlebar configurations:
app.engine('handlebars', handlebars.engine);
//sets the app to use the handlebars engine:
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


//Connects to the sequelize database and then listens for the server:
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
