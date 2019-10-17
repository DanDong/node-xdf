const { HttpError } = require('../core/errors')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if(error instanceof HttpError){
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.status
      if(global.env === 'develop'){
        console.log(ctx.body)
      }
    } else {
      ctx.body = {
        msg: '未知错误:' + error,
        errorCode: 99999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
      if(global.env === 'develop'){
        console.log(error)
      }
    }
  }
}

module.exports = catchError