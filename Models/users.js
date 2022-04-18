const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config()
const PrivateKey = process.env.PrivateKey



const userSchema = mongoose.Schema({
    userName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
})

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
            _id: this._id,
            userName: this.userName,
            email: this.email
        },
        PrivateKey, {
            expiresIn: '1d'
        })
}

const User = mongoose.model('Users', userSchema)


function joiValidation(req, res, next) {

    const joiSchema = Joi.object({
        userName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()

    })

    const result = joiSchema.validate(req.body)
    const {
        error
    } = result

    if (error) {
        return res.status(400).send({
            message: error.details[0].message
        })
    } else {
        next()
    }

}



exports.User = User
exports.joiValidation = joiValidation