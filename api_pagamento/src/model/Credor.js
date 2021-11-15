const sequelize = require('../database')
const { DataTypes, Model } = require('sequelize')

class Credor extends Model {}
Credor.init({
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
    cpf: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    statusCadastro: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Aprovado"
    }
}, {
    sequelize,
    modelName: 'Credor',
    tableName: 'credores'
})


module.exports = Credor