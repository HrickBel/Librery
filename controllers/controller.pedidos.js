const { now } = require('sequelize/types/utils');
const bodyParser = require('body-parser');
const pedidos = require('../model/pedido');
const database = require('../database/database');

const create_pedido = async (req,res) =>{
    try {
        await pedidos.create({
            dataPedido:now().getDate(),
            idUser:req.session.idUser,
            idBook:req.body.idBook,
            dataVencimento:now()+7,
            renovacoes:req.body.renovacoes
        });
        res.redirect('meuslivros');
    } catch (error) {
        console.error(error);
    }finally{
        database.close();
    }
    res.redirect('solicitar livro');
}

const renovar = async (req,res) =>{
    pedidos.update({renovacoes:(parseInt(req.body.renovacoes) <= 2?parseInt(req.body.renovacoes)++):2},{where:{id:req.body.idpedido}})
};
