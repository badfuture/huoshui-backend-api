const fs = require('fs')

module.exports = {
  "development": {
    "username": "admin",
    "password": "huoshui",
    "database": "huoshui_api",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "username": "admin",
    "password": "huoshui",
    "database": "huoshui_api",
    "host": "psql",
    "dialect": "postgres"
  }
}
