const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database/database');

const adm = db.define(
    'escola',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        matricula:{
            type:DataTypes.STRING,
            primaryKey:true,
        },
        email:{
            type:DataTypes.STRING(100),
            unique:true,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(32),
            allowNull:false,
        }
    }
);

adm.sync();

module.exports = adm;