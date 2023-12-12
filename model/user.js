const { Sequelize, DataTypes } = require('sequelize');
const db = require('../database/database');

const users = db.define(
    'users',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        idEscola:{
            type:DataTypes.STRING,
            allowNull:true,
            primaryKey:true,
            references:{
                model:'escola',
                key:'matricula'
            }
        },
        matricula:{
            type:DataTypes.STRING(36),
            primaryKey:true,
        },
        name:{
            type:DataTypes.STRING(60),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING(100),
            primaryKey:true,
            unique:true,
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
