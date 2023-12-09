const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database/database');
const { user } = require('../database/database.config');

const users = db.define(
    'users',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        matricula:{
            type:DataTypes.INTEGER,
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING(60),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING(100),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(32),
            allowNull:false,
        },
        isMatActive:{
            type:DataTypes.BOOLEAN,
            allowNull:true
        }
    }
);

users.sync();


module.exports = users;