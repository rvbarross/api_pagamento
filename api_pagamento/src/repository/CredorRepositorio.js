const Credor = require('../model/Credor')

class CredorRepositorio{

    insert(credor){
        const novoCredor = Credor.create({...credor})
        return novoCredor
    }

    async update(credor, id){
        const credorAlterado = await Credor.update({...credor}, { where: { id: id } })
        return credorAlterado
    }

    async delete(credorId){
        const credor = await Credor.findByPk(credorId)
        credor.destroy()
    }

    findById(credorId){
        //Credor.findAll({ where: { id: credorId } })
        const credor = Credor.findByPk(credorId)
        return credor
    }

    findAll(){
        return Credor.findAll()
    }

}

module.exports = CredorRepositorio