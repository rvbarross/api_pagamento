const express = require('express')
const router = express.Router()

const pagamentoRepositorio = require('../repository/PagamentoRepositorio')
const enteDevedorRepositorio = require('../repository/EnteDevedorRepositorio')
const credorRepositorio = require('../repository/CredorRepositorio')
const repositorio = new pagamentoRepositorio()
const credorRepo = new credorRepositorio()
const devedorRepo = new enteDevedorRepositorio()


router.use(express.json())

router.get('/', async (_, res) => {
    const pagamentos = await repositorio.findAll()
    resposta = {
        status: 'OK',
        dados: pagamentos
    }
    res.status(200).json(resposta)
})

router.get('/:id', async (req, res) => {
    let id = req.params.id
    const pagamento = await repositorio.findById(id)

    if(pagamento == undefined || pagamento == null){
        resposta = {
            status: 'ERROR',
            description: `Pagamentoo com id ${id} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    resposta = {
        status: 'OK',
        dados: pagamento
    }
    res.status(200).json(resposta)
})

router.post('/', async (req, res) => {
    let body = req.body

    if(body.credorId == undefined || body.enteDevedorId == undefined
        || body.valorInicial == undefined || body.valorFinal == undefined
        || body.data == undefined){
        resposta = {
            status: 'ERROR',
            description: `Os campos credorId, enteDevdorId, valor inicial, valor final, data e statusRemessa devem ser preenchidos`
        }
        res.status(400).json(resposta)
        return;
    }

    const credor = await credorRepo.findById(body.credorId)
    const devedor = await devedorRepo.findById(body.enteDevedorId)
    let credorExiste = true
    
    if(credor == null || credor == undefined){
        body.statusRemessa = "Inválido"
        body.motivo = "Credor inexistente"
        credorExiste = false
        resposta = {
            status: 'ERROR',
            description: `Credor inexistente`
        }
        res.status(406).json(resposta)
        return;
    }

    if(devedor == null || devedor == undefined){
        body.statusRemessa = "Inválido"
        body.motivo = "Ente Devedor inexistente"
        resposta = {
            status: 'ERROR',
            description: `Ente Devedor inexistente`
        }
        res.status(406).json(resposta)
        return;
    }

    if(body.valorInicial <= 0 || body.valorFinal <= 0){
        body.statusRemessa = "Inválido"
        body.motivo = "Valor final ou valor inicial menores ou igual a zero"
        // resposta = {
        //     status: 'ERROR',
        //     description: `Valor final e valor inicial devem ser maiores que zero`
        // }
        // res.status(406).json(resposta)
        // return;
    }

    if(body.valorFinal > body.valorInicial){
        body.statusRemessa = "Inválido"
        body.motivo = "Valor final menor que o valor inicial"
        // resposta = {
        //     status: 'ERROR',
        //     description: `Valor final deve ser maior que o valor inicial`
        // }
        // res.status(406).json(resposta)
        // return;
    }

    if(credorExiste && credor.statusCadastro != "Aprovado"){
        body.statusRemessa = "Inválido"
        body.motivo = "Status de cadastro de credor não aprovado"
        // resposta = {
        //     status: 'ERROR',
        //     description: `Status de cadastro de credor não aprovado`
        // }
        // res.status(406).json(resposta)
        // return;
    }

    if(credorExiste){
        const credorPagamentos = await repositorio.findByCredorId(credor.id)
        console.log(credorPagamentos);
    }

    const pagamento = await repositorio.insert(body)

    resposta = {
        status: 'OK',
        description: `Pagamento criado com sucesso`
    }

    res.status(200).json(resposta)
})

router.put('/:id', async (req, res) => {
    let body = req.body
    let id = req.params.id
    const pagamento = await repositorio.findById(id)

    if(pagamento == undefined || pagamento == null){
        resposta = {
            status: 'ERROR',
            description: `Pagamento com id ${id} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    if(body.valorInicial <= 0 || body.valorFinal <= 0){
        resposta = {
            status: 'ERROR',
            description: `Valor final e valor inicial devem ser maiores que zero`
        }
        res.status(406).json(resposta)
        return;
    }

    if(body.valorFinal > body.valorInicial){
        resposta = {
            status: 'ERROR',
            description: `Valor final deve ser maior que o valor inicial`
        }
        res.status(406).json(resposta)
        return;
    }

    const credor = await credorRepo.findById(body.credorId)
    const devedor = await devedorRepo.findById(enteDevedorId)

    if(credor == null || credor == undefined){
        resposta = {
            status: 'ERROR',
            description: `Credor inexistente`
        }
        res.status(406).json(resposta)
        return;
    }

    if(devedor == null || devedor == undefined){
        resposta = {
            status: 'ERROR',
            description: `Ente Devedor inexistente`
        }
        res.status(406).json(resposta)
        return;
    }

    if(credor.statusCadastro != "Aprovado"){
        resposta = {
            status: 'ERROR',
            description: `Status de cadastro de credor não aprovado`
        }
        res.status(406).json(resposta)
        return;
    }

    await repositorio.update(body, id)

    resposta = {
        status: 'OK',
        description: `Pagamento com id ${id} alterado com sucesso`
    }

    res.status(200).json(resposta)
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    const pagamento = await repositorio.findById(id)

    if(pagamento == undefined || pagamento == null){
        resposta = {
            status: 'ERROR',
            description: `Pagamento com id ${id} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    repositorio.delete(id)

    resposta = {
        status: 'OK',
        description: `Pagamento excluido com sucesso`
    }

    res.status(200).json(resposta)
})

module.exports = router