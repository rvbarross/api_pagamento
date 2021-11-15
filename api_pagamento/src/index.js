const express = require('express')
const app = express()
const port = 3000

require('dotenv').config()

const sequelize = require('./database')
const routes = require('./routes')

const Credor = require('./model/Credor')
const EnteDevedor = require('./model/EnteDevedor')
const Pagamento = require('./model/Pagamento')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', routes)


app.listen(port, async() => {
    await sequelize.sync({force: true})
    console.log("Server Up Baby!!")
})