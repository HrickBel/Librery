const { now } = require('sequelize/types/utils');
const bodyParser = require('body-parser');
const pedidos = require('../model/pedido');
const database = require('../database/database');
const { UUID, UUIDV4 } = require('sequelize');

const create_pedido = async (req,res) =>{
        await pedidos.create({
            dataPedido:now().getDate(),
            idUser:UUIDV4(),
            idBook:req.body.idBook,
            dataVencimento:now()+7,
            renovacoes:req.body.renovacoes
        });
        res.redirect('home');


const renovar = async (req,res) =>{
    pedidos.update({renovacoes:(parseInt(req.body.renovacoes) <= 2?parseInt(req.body.renovacoes)++):2},{where:{id:req.body.idpedido}})
};
