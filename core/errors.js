const error = {
  200:"返回正常",
  10000:"返回正常",
  10001:"手机号或密码错误",
  10002:"用户不存在",
  10003:"手机号已注册",
  10004:"旧密码错误",
  10005:"校区已存在",

  400:"参数错误",
  10010:"缺少必传参数",
  10011:"参数类型错误",
  10012:"参数有误",

  401:"未授权",
  10020:"权限不足",

  403:"禁止访问",
  10030:"token失效",
  10031:"未携带token",
  10032:"非法的token",

  404:"资源未找到",
  10040:"商品不存在",

  500:"服务器错误",
  99999:"未知错误",
  10051:"文件上传失败"
}

class HttpError extends Error {
  constructor(msg, errorCode, status){
    super()
    this.msg = msg || '未知错误'
    this.errorCode = errorCode || 99999
    this.status = status || 500
  }
}

class KnownError extends HttpError {
  constructor(errorCode, status){
    super()
    this.msg = error[errorCode]
    this.errorCode = errorCode
    this.status = status || 200
  }
}

module.exports = {
  HttpError,
  KnownError
}