const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database/database');

const books = db.define(
	'books',
	{
		id:{
			type:DataTypes.INTEGER,
			autoIncrement:true,
			primaryKey:true
		},
		ISBN:{
			type:DataTypes.INTEGER,
			primaryKey:true
		},
		AnoLancamento:{
			type:DataTypes.DATE
		},
		title:{
			type:DataTypes.STRING(256),
			allowNull:false

		},
		editora:{
			type:DataTypes.STRING(256),
			allowNull:false
		},
		autor:{
			type:DataTypes.STRING(60)
		},
		edicao:{
			type:DataTypes.TEXT('tiny')
		},
		isAtLib:{
			type:DataTypes.BOOLEAN
		}
	});


books.sync({force:true});

module.exports = books;