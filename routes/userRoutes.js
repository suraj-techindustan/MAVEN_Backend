const express = require('express')
const router = express.Router()
const userController = require('../controllers/userControllers')

router.post('/addUser',userController.adduser)
router.post('/login',userController.login)
router.get('/getUser',userController.getUser)
router.post('/forgetPassword',userController.forgotPassword)
router.post('/verifyOtp',userController.verifyOtp)
router.put('/resetPassword',userController.resetPassword)


module.exports = router;