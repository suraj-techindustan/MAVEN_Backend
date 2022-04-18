const express = require('express')
const userRoutes = require('../routes/userRoutes')
const bookRoutes = require('../routes/bookRoutes')

module.exports=function(app){
    app.get('/',(req,res)=>{
        return  res.send(`Welcome To Our Book Store ::`)
    })
    app.use('/api/v1/user',userRoutes)
    app.use('/api/v1/book',bookRoutes)
    app.use('*',(req,res)=>{
        return res.status(404).send({message : "The route You are looking for not exists."})
    })

}