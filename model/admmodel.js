const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database/database');

const adm = db.define(
    'adm',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        matricula:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        password:{
            type:DataTypes.STRING(32),
            allowNull:false,
        }
    }
);

adm.sync();

module.exports = adm;