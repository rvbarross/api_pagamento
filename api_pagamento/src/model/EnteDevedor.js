const sequelize = require('../database')
const { DataTypes, Model } = require('sequelize')


class EnteDevedor extends Model {}
EnteDevedor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'EnteDevedor',
    tableName: 'entedevedores'
})


module.exports = EnteDevedor