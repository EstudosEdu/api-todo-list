const { DataTypes } = require('sequelize');

const tableProduto = {
    name: 'Produto',
    table: {
        name: {
            type: DataTypes.STRING
        },
        descricao: {
            type: DataTypes.STRING
        }
    },
    options: { freezeTableName: true }
}


module.exports = tableProduto;