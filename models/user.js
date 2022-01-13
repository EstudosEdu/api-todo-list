const { DataTypes } = require('sequelize');

const tableUser = {
    name: 'Users',
    table: {
        name: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        }
    },
    options: { freezeTableName: true }
}

module.exports = tableUser;