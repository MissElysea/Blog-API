const Article = require('../models/article')
const User = require('../models/user')

// Create Article //

exports.createArticle = async function (req, res) {
    try {
        const userId = req.user._id
        req.body.user = userId
        const article = await Article.create(req.body)
        
        if (userId) {
            const user = await User.findById(userId)
         if (user) {
            user.article ? user.article.addToSet(article._id) : (user.article = [article._id])
            await user.save()
        }
    }
        
        res.json(article)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Find Article //

exports.findArticle = async function (req, res) {
    try {
        const article = await Article.findOne({ _id: req.params.id })
        res.json(article)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update Article //

exports.updateArticle = async function (req, res) {
    try {
        const updatedArticle = await Article.findOneAndUpdate ({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
        res.json(updatedArticle)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Delete Article //

exports.deleteArticle = async function (req, res) {
    try {
        await Article.findOneAndDelete({ _id: req.params.id, user: req.user._id })
        res.json({ message: 'Article Deleted Successfully' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

