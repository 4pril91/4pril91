// 댓글 스키마
const mongoose = require('mongoose');

const {Schema} = mongoose;
const CommentSchema = new Schema({
    authID: {
        type: String,
        required: true,
    },
    boardID: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('Comment', CommentSchema);