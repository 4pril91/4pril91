const jwt = require('jsonwebtoken');
const users = require('../schemas/user');

module.exports = async (req, res, next) => {
  const token = req.cookies.user;
  console.log('미들웨어 사용함');
  try {
    if (token) {
      const decoded = jwt.verify(token, 'my-secret-key');
      const user = await users.findOne({ nickName : decoded.userId });
      res.locals.user = user.nickName;
      console.log('로컬 유저는?', res.locals.user);
    } else {
      res.locals.user = undefined;
      console.log('로컬 유저는?', res.locals.user);      
    }
  } catch (err) {
    res.locals.user = undefined;
    res.status(401).send({ errorMessage: '로그인이 필요합니다' });
    return;
  }
  next();
};
