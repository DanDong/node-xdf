# node-koa

#### 介绍
+ 一个基于node-koa-mysql-sequelize的后台接口系统
+ 使用node+koa+sequelize的开发速度也是极快的，只要前期做好全局路由监听以及全局错误捕获，之后写业务就是顺手拈来，行云流水的感觉。


#### 安装教程

1. npm i
2. node app.js


#### 目录结构
+ app 存放主程序
  - api 存放所有的接口
  - models 存放所有的数据库表模型
  - service 存放服务层业务代码
+ config 配置文件
  - config.js 全局不配置文件  其中的env挂载在global上，通过global.env来获取
+ core 核心js代码
  - db.js  初始化连接mysql数据库
  - errors.js  保存所有的抛错逻辑
  - init.js 初始化加载内容
  - unit.js 保存公共函数
+ middleWare  自定义中间件
  - catchError.js  全局捕获异常
  - auth.js  验证token的中间件
+ app.js 程序入口文件

#### 其他
- 希望您可以给我的项目点个star，万分感谢；
- 感兴趣的同学可以在我的代码仓库中查看该项目配套前端：uni-xdf ；