const express = require('express')
const router = express.Router()

const enteDevedorRepositorio = require('../repository/EnteDevedorRepositorio')
const PagamentoRepositorio = require('../repository/PagamentoRepositorio')
const repositorio = new enteDevedorRepositorio()
const pagamentoRepositorio = new PagamentoRepositorio()
router.use(express.json())

router.get('/', async (_, res) => {
    const enteDevedor = await repositorio.findAll()
    resposta = {
        status: 'OK',
        dados: enteDevedor
    }
    res.status(200).json(resposta)
})

router.get('/:id', async (req, res) => {
    let enteDevedorId = req.params.id
    const enteDevedor = await repositorio.findById(enteDevedorId)

    if(enteDevedor == undefined || enteDevedor == null){
        resposta = {
            status: 'ERROR',
            description: `Ente Devedor com id ${enteDevedorId} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    resposta = {
        status: 'OK',
        dados: enteDevedor
    }
    res.status(200).json(resposta)
})

router.get('/:id/pagamentos', async (req, res) => {
    let enteDevedorId = req.params.id
    const enteDevedor = await repositorio.findById(enteDevedorId)

    if(enteDevedor == undefined || enteDevedor == null){
        resposta = {
            status: 'ERROR',
            description: `Ente Devedor com id ${enteDevedorId} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    const pagamentos = await pagamentoRepositorio.findByDevedorId(enteDevedorId)

    if(pagamentos == null || pagamentos == undefined){
        resposta = {
            status: 'ERROR',
            description: `Pagamentos do ente devedor com id ${credorId} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }
    
    resposta = {
        status: 'OK',
        dados: pagamentos
    }
    
    res.status(200).json(resposta)
})

router.post('/', async (req, res) => {
    let body = req.body

    if(body.nome == undefined || body.cnpj == undefined){
        resposta = {
            status: 'ERROR',
            description: `Os campos nome e cnpj devem ser preenchidos`
        }
        res.status(400).json(resposta)
        return;
    }

    const enteDevedor = await repositorio.insert(body)

    resposta = {
        status: 'OK',
        description: `Ente Devedor ${enteDevedor.nome} criado com sucesso`
    }

    res.status(200).json(resposta)
})

router.put('/:id', async (req, res) => {
    let body = req.body
    let id = req.params.id
    const enteDevedor = await repositorio.findById(id)

    if(enteDevedor == undefined || enteDevedor == null){
        resposta = {
            status: 'ERROR',
            description: `Ente Devedor com id ${id} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    const ente_devedor_alterado = await repositorio.update(body, id)

    resposta = {
        status: 'OK',
        description: `Credor com id ${id} alterado com sucesso`
    }

    res.status(200).json(resposta)
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    const enteDevedor = await repositorio.findById(id)

    if(enteDevedor == undefined || enteDevedor == null){
        resposta = {
            status: 'ERROR',
            description: `Ente Devedor com id ${id} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    repositorio.delete(id)

    resposta = {
        status: 'OK',
        description: `Ente Devedor excluido com sucesso`
    }

    res.status(200).json(resposta)
})

module.exports = router