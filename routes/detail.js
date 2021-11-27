// 상페 페이지 라우터
const express = require('express');
const router = express.Router();
const comments = require('../schemas/comment');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/comment/:boardId', async (req, res) => {
    try {
        const {authID, boardID, comment, date} = req.body;
        // DB 댓글 저장
        await comments.create({
            authID: authID,             
            boardID: boardID,
            comment: comment,           
            date: date,
        });
        res.send();

    } catch (err) {
        res.status(500).send({msg: '댓글삭제 에러입니다.'});
    }
});


router.get('/comment/:boardId' , async (req, res) => {
    try{
        let commentList = await comments.find({}).sort("-date");
        res.json({commentList: commentList});

    }catch (err){

    }
});






// 댓글 수정시 인풋창 값
router.post('/editcomment/:boardId', authMiddleware , async (req, res) => {
    const { boardId } = req.params;
    const { value } = req.body;
    console.log(value)
    const userId = res.locals.user;

    const edit_comment = await comments.findOne({ _id : value });
    console.log(edit_comment)
    if (userId == edit_comment.authID) {
      res.send(edit_comment.comment);
    } else {
      res.status(400).send({});
    }
  });


// 댓글 수정본 저장
router.patch('/editSubmit/:boardId', authMiddleware, async (req, res) => {
    const { value, editComment_give } = req.body;
    await comments.updateOne(
      { _id: value },
      { $set: { comment: editComment_give } }
    );
    res.send({ result: 'success' });
  });
  

// 댓글 삭제
router.delete('/delcomment/:boardId', authMiddleware, async (req, res) => {
    const { _id } = req.params;
    const userId = res.locals.user;
    const { value } = req.body;
    const commentd = await comments.findOne({ _id: value });
    if (userId === commentd.authID) {
      await comments.deleteOne({ _id: value });
      res.send({ result: 'success' });
    } else {
      res.status(400).send({});
    }
  });


module.exports = router;