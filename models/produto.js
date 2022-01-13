const { DataTypes } = require('sequelize');

const tableProduto = {
    name: 'Produto',
    table: {
        name: {
            type: DataTypes.STRING
        },
        checked: {
            type: DataTypes.BOOLEAN
        }
    },
    options: { freezeTableName: true }
}


module.exports = tableProduto;