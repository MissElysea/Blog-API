const Article = require('../models/article')
const User = require('../models/user')

// Create Article //

exports.createArticle = async (req, res) => {
    try {
        const article = new Article({
            title: req.body.title,
            description: req.body.description,
            user: req.user._id
        })
        await article.save();
        const token = await req.user.generateAuthToken()
        res.status(200).json({ article, token });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

// Find Article //

exports.findArticle = async function (req, res) {
    try {
        const article = await Article.findOne({ _id: req.params.id })
        if (!article) {
            throw new Error('Article Not Found')
        }
        res.json({ article }) 
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// Update Article //

exports.updateArticle = async (req, res) => {
    try {
        const article = await Article.findOneAndUpdate (
            { _id: req.params.id, user: req.user._id }, 
            req.body, 
            { new: true }
            );
            if (!article) {
                throw new Error('Article Not Found');
            }
            res.status(200).json(article);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
     
// Delete Article //

exports.deleteArticle = async (req, res) => {
    try {
        const article = await Article.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
          });
          if (!article) {
            throw new Error('Article not found');
          }
          res.status(200).json({ message: 'Article Deleted Successfully' });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      };