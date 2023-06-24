const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')
const userController = require('../controllers/user')

// Create /article
router.post('/', userController.auth, articleController.createArticle)
// Find /article/:id
router.get('/:id', userController.auth, articleController.findArticle)
// Update /article/:id
router.put('/:id', userController.auth, articleController.updateArticle)
// Delete /article/:id
router.delete('/:id', userController.auth, articleController.deleteArticle)

module.exports = router