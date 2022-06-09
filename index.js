const express = require("express")
const cors = require('cors')
require('dotenv/config')
require('./src/database')

const app = express()
const router = require('./src/routes/router')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(router)

app.get('/',(request, response) => {
    response.send('Api Login ❤️ Amigo')
})

app.listen(process.env.PORT, () => {
    console.log("Api de login rondando na porta: " + process.env.PORT)
})