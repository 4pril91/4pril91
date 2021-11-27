const express = require("express")
const users = require("../schemas/user")
const jwt = require("jsonwebtoken");
const router = express.Router()



//회원가입
router.post('/signup', async (req, res) => {

    const { nickName, passWd } = req.body;


    // let userId = await users.find({}).sort("-userId").limit(1);
    // if (userId.length == 0) { userId = 1 } // 검색결과가 없으면 boardId를 1로 설정
    // else { userId = userId[0]['userId'] + 1; } //검색결과가 있으면 결과의 boardId + 1 로 설정
    

    const existUsers = await users.findOne({
       nickName : nickName 
    });
    if(existUsers == null){
        await users.create({ nickName, passWd });
        res.send ({result : "success"}) // 널이면 디비에 생성 성공
    }
    else if(existUsers.nickName == nickName){
        res.send({ result : "fail"})    // 있으면 실패
    }
    
});

//로그인 하기
router.post('/signin', async (req, res) => {
    const { nickName, passWd } = req.body;
    const existUsers = await users.findOne({
        nickName : nickName
    });
    if(existUsers == null) {
        res.send({ result : "fail"});
    }  
    else if(existUsers.nickName === nickName && existUsers.passWd === passWd )  {
        const token = jwt.sign({ userId : existUsers.nickName }, 'my-secret-key');
        console.log(token)
        res.cookie('user', token);
        res.json({ token, result : "success" });
       
    } 
    else {
        res.send({ result : "fail"});
    }
    
});



module.exports = router;