const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//Set an if statement to either connect to a heroku database or a local database:
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL,
    {
      "development": {
        "database": "projectdb",
        "host": "127.0.0.1",
        "dialect": "postgres"
      },
      "test": {
        "database": "projectdb",
        "host": "127.0.0.1",
        "dialect": "postgres"
      },
      "production": {
        "use_env_variable": "DATABASE_URL"
      }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}



module.exports = sequelize;
