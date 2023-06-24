const { model, Schema } = require('mongoose')

const articleSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
})

const Article = model('Article', articleSchema)

module.exports = Article