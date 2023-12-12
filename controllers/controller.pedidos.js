const { now } = require('sequelize/types/utils');
const pedidos = require('../model/pedido');

const create_pedido = async (req,res) =>{
    await pedidos.create({
        dataPedido:now().getDate(),
        idUser:req.session.idUser,
        idBook:
    });
}
