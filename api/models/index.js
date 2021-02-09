const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
const config = require('dotenv').config()

// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize(config.parsed.DB_DATABASE, config.parsed.DB_USER, config.parsed.DB_PASS, {
	host: config.parsed.DB_HOST
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.tutorials = require("./user.model.js")(sequelize, Sequelize)

module.exports = db