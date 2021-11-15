const EnteDevedor = require('../model/EnteDevedor')

class EnteDevedorRepositorio{

    insert(enteDevedor){
        return EnteDevedor.create({...enteDevedor})
    }

    async update(enteDevedor, id){
        return await EnteDevedor.update({...enteDevedor}, { where: { id: id } })
    }

    async delete(enteDevedor){
        const devedor = await EnteDevedor.findByPk(enteDevedor)
        devedor.destroy()
    }

    findById(enteDevedorId){
        return EnteDevedor.findByPk(enteDevedorId)
    }

    findAll(){
        return EnteDevedor.findAll()
    }

}

module.exports = EnteDevedorRepositorio