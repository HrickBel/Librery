const {DataTypes} = require('sequelize');
const database = require('../database/database');

const contatos = database.define(
    'contatos',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        idescola:{
            type:DataTypes.STRING,
            primaryKey:true,
            references:{
                model:'escola',
                key:'matricula'
            }
        },
        email:{
            type:DataTypes.STRING
        },
        phone:{
            type:DataTypes.STRING
        }
    }
);

contatos.sync();

module.exports = contatos;
