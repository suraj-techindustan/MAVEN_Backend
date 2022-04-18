const express = require('express');
const app = express()

const dotenv = require('dotenv');
dotenv.config()
const Port = process.env.PORT
const DB = process.env.DB
const mongoose = require('mongoose');
const cors = require('cors')

app.use(cors())
app.use(express.json())

mongoose.connect(DB,{ useNewUrlParser : true , useUnifiedTopology : true})
.then(console.log('Connected To DataBase '))
.catch(err=>(console.log(`Failed To connect ${err}`)))

require('./startup/router')(app)

app.listen(Port,()=>(console.log(`Listening To PORT : ${Port}`)))