const { model, Schema } = require('mongoose')

const articleSchema = new Schema ({
    title: { type: String, required: true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
},
   { timestamps: true }
);

const article = model('article', articleSchema)

module.exports = article