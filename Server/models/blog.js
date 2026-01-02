const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},{
    timestamps: true
})

const Blogpost = mongoose.model('blogpost', blogSchema)
module.exports = Blogpost