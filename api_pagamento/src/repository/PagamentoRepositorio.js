const Pagamento = require('../model/Pagamento')

class PagamentoRepositorio{

    insert(pagamento){
        return Pagamento.create({...pagamento}) 
    }

    async update(pagamento){
        return Pagamento.update({...pagamento}, { where: { id: pagamento.id } })
    }

    async delete(pagamentoId){
        const pagamento = await Pagamento.findByPk(pagamentoId)
        pagamento.destroy()
    }

    findById(pagamentoId){
        return Pagamento.findByPk(pagamentoId)
    }

    findByCredorId(credorId){
        return Pagamento.findAll({ where: { credorId: credorId } })
    }

    findByDevedorId(devedorId){
        return Pagamento.findAll({ where: { enteDevedorId: devedorId } })
    }

    findAll(){
        return Pagamento.findAll()
    }

}

module.exports = PagamentoRepositorio