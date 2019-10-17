const Router = require('koa-router')
const {KnownError} = require('../../../core/errors')
const {User} = require('../../models/user')
const {School} = require('../../models/school')
const {Log} = require('../../models/log')
const Auth = require('../../../middleWare/auth')

const router = new Router({
  prefix:'/v1/user'
})
 
// 手机号注册
router.post('/register', async (ctx, next) => {
  let body = ctx.request.body
  if (body.uname && body.password && body.phone && body.sid) {
    let result = await User.register(body.uname, body.password, body.phone, body.sid)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 手机号登录
router.post('/login', async (ctx, next) => {
  let body = ctx.request.body
  if (body.phone && body.password) {
    let result = await User.login(body.phone, body.password)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 修改密码
router.put('/password', new Auth().m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.oldpassword && body.password) {
    let result = await User.updatePassword(ctx.auth.uid, body.oldpassword, body.password)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 修改用户名
router.put('/uname', new Auth().m, async (ctx, next) => {
  let body = ctx.request.body

  if (body.uname) {
    let result = await User.updateUname(ctx.auth.uid, body.uname)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 重置密码(前台需进行手机验证码验证)
router.put('/resetPassword', async (ctx, next) => {
  let body = ctx.request.body
  if (body.phone && body.password) {
    let result = await User.resetPassword(body.phone, body.password)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 专门校验token
router.post('/verify', async (ctx,next) => {
  let body = ctx.request.body
  if(body.token){
    const isHefa = Auth.validatorToken(body.token)
    ctx.body = {
      code: 10000,
      data: {
        authorized: isHefa
      }
    }
  } else {
    throw new KnownError(10010)
  }
})

// 修改手机号
router.put('/phone', new Auth().m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.phone) {
    let result = await User.updatePhone(ctx.auth.uid, body.phone)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 获取用户信息
router.get('/info', new Auth().m, async (ctx, next) => {
  let result = await User.getInfo(ctx.auth.uid)
  ctx.body = {
    code: 10000,
    data: result
  }
})

// 更新当前课时
router.put('/current', new Auth().m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.current) {
    let result = await User.updateCurrent(ctx.auth.uid, body.current)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 更新总课时
router.put('/total', new Auth(3).m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.uid && body.total) {
    let result = await User.updateTotal(body.uid, body.total)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 获取可见用户列表
router.get('/list', new Auth(3).m, async (ctx, next) => {
  let result = await User.getUserList()
  ctx.body = {
    code: 10000,
    data: result
  }
})

// 获取所有用户列表
router.get('/listAll', new Auth(3).m, async (ctx, next) => {
  let result = await User.getUserListAll()
  ctx.body = {
    code: 10000,
    data: result
  }
})

// 设置用户状态
router.put('/setUserStatus', new Auth(3).m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.uid && body.status) {
    let result = await User.setUserStatus(body.uid, body.status)
    ctx.body = {
      code: 10000,
      data: result
    }
  }else{
    throw new KnownError(10010)
  }
  
})


//修改用户所属校区
router.put('/setUserSchool', new Auth().m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.sid) {
    let result = await User.updateSchool(ctx.auth.uid, body.sid)
    ctx.body = {
      code: 10000,
      data: result
    }
  }else{
    throw new KnownError(10010)
  }
})

// 获取可见校区列表
router.get('/schoolList', async (ctx, next) => {
  let result = await School.getList()
  ctx.body = {
    code: 10000,
    data: result
  }
})

// 获取所有校区列表
router.get('/schoolListAll', new Auth(3).m, async (ctx, next) => {
  let result = await School.getListAll()
  ctx.body = {
    code: 10000,
    data: result
  }
})

// 设置校区状态
router.put('/setSchoolStatus', new Auth(3).m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.sid && body.status) {
    let result = await School.setSchoolStatus(body.sid, body.status)
    ctx.body = {
      code: 10000,
      data: result
    }
  }else{
    throw new KnownError(10010)
  }
  
})

// 新建校区
router.post('/addSchool', new Auth(3).m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.sname) {
    let result = await School.add(body.sname)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 编辑校区
router.put('/editSchool', new Auth(3).m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.sid && body.sname) {
    let result = await School.edit(body.sid, body.sname)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 删除校区
router.delete('/school', new Auth(3).m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.sid) {
    let result = await School.delete(body.sid)
    ctx.body = {
      code: 10000,
      data: result
    }
  }else{
    throw new KnownError(10010)
  }
})

// 保存当日记录
router.post('/log', new Auth(3).m, async (ctx, next) => {
  let body = ctx.request.body
  if (body.info) {
    let result = await Log.add(body.info)
    ctx.body = {
      code: 10000,
      data: result
    }
  } else {
    throw new KnownError(10010)
  }
})

// 获取最近一条记录
router.get('/log', new Auth(3).m, async (ctx, next) => {
  let result = await Log.getLast()
  ctx.body = {
    code: 10000,
    data: result
  }
})

module.exports = router
