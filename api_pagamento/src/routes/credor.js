const express = require('express')
const router = express.Router()

const CredorRepositorio = require('../repository/CredorRepositorio')
const PagamentoRepositorio = require('../repository/PagamentoRepositorio')
const repositorio = new CredorRepositorio()
const pagamentoRepositorio = new PagamentoRepositorio()

router.use(express.json())

router.get('/', async (_, res) => {
    const credores = await repositorio.findAll()
    resposta = {
        status: 'OK',
        dados: credores
    }
    res.status(200).json(resposta)
})

router.get('/:id', async (req, res) => {
    let credorId = req.params.id
    const credor = await repositorio.findById(credorId)

    if(credor == undefined || credor == null){
        resposta = {
            status: 'ERROR',
            description: `Credor com id ${credorId} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    resposta = {
        status: 'OK',
        dados: credor
    }
    res.status(200).json(resposta)
})

router.get('/:id/pagamentos', async (req, res) => {
    let credorId = req.params.id
    const credor = await repositorio.findById(credorId)

    if(credor == undefined || credor == null){
        resposta = {
            status: 'ERROR',
            description: `Credor com id ${credorId} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    const pagamentos = await pagamentoRepositorio.findByCredorId(credorId)

    if(pagamentos == null || pagamentos == undefined){
        resposta = {
            status: 'ERROR',
            description: `Pagamentos do credor com id ${credorId} não encontrado`
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

    if(body.nome == undefined || body.cpf == undefined){
        resposta = {
            status: 'ERROR',
            description: `Os campos id, nome e cpf devem ser preenchidos`
        }
        res.status(400).json(resposta)
        return;
    }

    const credor = await repositorio.insert(body)

    resposta = {
        status: 'OK',
        description: `Credor ${credor.nome} criado com sucesso`
    }

    res.status(200).json(resposta)
})

router.put('/:id', async (req, res) => {
    let body = req.body
    let id = req.params.id
    const credor = await repositorio.findById(id)

    if(credor == undefined || credor == null){
        resposta = {
            status: 'ERROR',
            description: `Credor com id ${id} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    await repositorio.update(body, id)

    resposta = {
        status: 'OK',
        description: `Credor com id ${id} alterado com sucesso`
    }

    res.status(200).json(resposta)
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    const credor = await repositorio.findById(id)

    if(credor == undefined || credor == null){
        resposta = {
            status: 'ERROR',
            description: `Credor com id ${id} não encontrado`
        }
        res.status(404).json(resposta)
        return;
    }

    repositorio.delete(id)

    resposta = {
        status: 'OK',
        description: `Credor excluido com sucesso`
    }

    res.status(200).json(resposta)
})

module.exports = router