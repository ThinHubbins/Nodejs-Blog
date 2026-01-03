const mongoose = require('mongoose')
const schema = mongoose.Schema

const blogreq = new schema({
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
    },
    {
    timestamps: true
})
const Blogpost = mongoose.model('blogposts', blogreq )
module.exports = Blogpost