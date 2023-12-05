const {Sequelize} = require('sequelize');
const config = require('./database.config');
const database = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
		host:config.host,
		dialect:'mysql'
	});

database.authenticate().then(() => {
	console.log('Banco de dados conectado');
<<<<<<< HEAD
	module.exports = database;
=======
>>>>>>> 083596898ccaced6fc9fc58abc80eb9cb18f260c
}).catch((err) => {
	console.error('não conectado:', err);
});
<<<<<<< HEAD

=======
module.exports = database;
>>>>>>> 083596898ccaced6fc9fc58abc80eb9cb18f260c
