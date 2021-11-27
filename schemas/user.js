// 회원가입 정보스키마
const mongoose = require("mongoose");

const {Schema} = mongoose;
const userSchema = new Schema({
    nickName : {
        type: String
    },
    passWd : {
        type : String,
    },

})

module.exports = mongoose.model("user", userSchema)
