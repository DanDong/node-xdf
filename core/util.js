const jwt = require('jsonwebtoken')

// 生成token
const getToken = (uid, type) => {
  return jwt.sign({
    uid,
    type
  }, global.secretKey, {
    expiresIn: global.expireTime
  })
}

module.exports = {
  getToken
}