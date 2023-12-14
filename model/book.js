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
		idEscola:{
			type:DataTypes.STRING,
			primaryKey:true,
			unique:true,
			references:{
				model:'escolas',
				key:'matricula'
			}
		},
		ISBN:{
			type:DataTypes.BIGINT,
			primaryKey:true
		},
		AnoLancamento:{
			type:DataTypes.SMALLINT
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
			type:DataTypes.TEXT('tiny'),
			allowNull:true
		},
		categoria:{
			type:DataTypes.STRING(100),
			allowNull:false
		},
		isAtLib:{
			type:DataTypes.BOOLEAN
		}
	});


books.sync();

module.exports = books;
