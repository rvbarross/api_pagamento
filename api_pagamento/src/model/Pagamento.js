const sequelize = require('../database')
const { DataTypes, Model } = require('sequelize')
const Credor = require('./Credor')
const EnteDevedor = require('./EnteDevedor')

class Pagamento extends Model {}
Pagamento.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    credorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Credor,
            key: 'id'
        },
        allowNull: false
    },
    enteDevedorId: {
        type: DataTypes.INTEGER,
        references: {
            model: EnteDevedor,
            key: 'id'
        },
        allowNull: false
    },
    valorInicial: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    valorFinal: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    data: {
        type: DataTypes.DATE,
        allowNull: false
    },
    statusRemessa: {
        type: DataTypes.STRING,
        defaultValue: "Válido",
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Pagamento',
    tableName: 'pagamentos'
})


module.exports = Pagamento