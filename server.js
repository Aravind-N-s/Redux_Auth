require('dotenv/config')
const express = require('express')
const app = express()
const cors = require('cors')
const {mongoose} = require('./config/database')

const { usersRouter } = require('./api/controllers/userController') 

app.use(express.json())
app.use(cors())

app.use('/users',usersRouter)

app.listen(process.env.PORT ,() =>{
    console.log('Listening on port', process.env.PORT)
})