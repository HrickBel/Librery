require('dotenv').config();

module.exports = {
	host: process.env.HOST,
	database: process.env.DATABASE,
	user: process.env.USERDB,
	password: process.env.PASSWORD
}