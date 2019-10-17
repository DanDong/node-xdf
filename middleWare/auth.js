const {KnownError} = require('../core/errors')
const jwt = require('jsonwebtoken')

class Auth {
  // 通过level设置api的权限可供那些人访问
  constructor(level){
    this.level = level || 1
  }

  get m(){
    return async (ctx, next) => {
      // token检测
      const token = ctx.headers.token
      if(!token){
        throw new KnownError(10031, 403)
      }
      let decode = {}
      try {
        decode = jwt.verify(token, global.secretKey)
      } catch (error) {
        if(error.name === 'TokenExpiredError'){
          throw new KnownError(10030, 403)
        } else {
          throw new KnownError(10032, 403)
        }
      }

      if(decode.type < this.level){
        throw new KnownError(10020, 401)
      }

      ctx.auth = {
        uid: decode.uid,
        type: decode.type
      }
      
      await next()
    }
  }

  // 专门校验token是否合法的静态函数
  static validatorToken(token){
    if(!token){
      return false
    }
    try {
      jwt.verify(token, global.secretKey)
      return true
    } catch (error) {
      return false
    }
  }
}

module.exports = Auth