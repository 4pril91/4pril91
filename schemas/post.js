// 게시물 스키마 구현
const mongoose = require('mongoose');

const {Schema} = mongoose;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
},{
    versionKey: false,
})

module.exports = mongoose.model('Post', PostSchema);