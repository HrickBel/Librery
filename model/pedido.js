const { Sequelize, DataTypes} = require('sequelize');
const db = require('../database/database');

const pedidos = db.define(
	'pedidos',{
		id:{
			type:DataTypes.INTEGER,
			primaryKey:true,
			autoIncrement:true
		},
		dataPedido:{
			type:DataTypes.DATE,
			allowNull:false,
		},
		idUser:{
			type:DataTypes.INTEGER,
			primaryKey:true,

			references:{
				model:'user',
				key:'id'
			}		
		},
		idBook:{
			type:DataTypes.INTEGER,
			primaryKey:true,
			references:{
				model:'books',
				key:'id'
	
			}
		},
		dataVencimento:{
			type:DataTypes.DATE
		},
		renovacoes:{
			type:DataTypes.INTEGER
		}
	});

pedidos.sync();

module.exports = pedidos;
