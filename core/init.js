const Router = require('koa-router')
const requireDirectory = require('require-directory')
const config = require('../config/config')
const path = require('path')
const koaStatic = require('koa-static')

class InitManager {
  static init(app){
    InitManager.app = app
    InitManager.loadRouter()
    InitManager.loadConfig()
    InitManager.loadStatic()
  }

  // 加载所有的路由
  static loadRouter(){
    const apiPath = '../app/api'
    requireDirectory(module, apiPath, {
      visit: whenLoadRouter
    })

    function whenLoadRouter(obj){
      if(obj instanceof Router){
        InitManager.app.use(obj.routes())
      }
    }
  }

  // 加载配置文件
  static loadConfig(){
    global.env = config.env
    global.secretKey = config.secretKey
    global.expireTime = config.expireTime
  }

  // 加载静态资源
  static loadStatic(){
    InitManager.app.use(koaStatic(path.join(__dirname,'../static/')))
  }
}


module.exports = InitManager