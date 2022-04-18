const express = require('express')
const router = express.Router()
const bookController = require('../controllers/bookControllers')

router.post('/addBooks',bookController.addBooks)
router.get('/allBooks',bookController.allBooks)
router.get('/getBook',bookController.getBook)
router.post('/singleBook',bookController.singleBook)

module.exports = router;