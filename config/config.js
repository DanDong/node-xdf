module.exports = {
  env: 'develop',
  db: {
    dbname:'xdf',
    host:'47.107.90.142',   //这里配置自己的数据库地址
    user:'root',
    password:'********',
    port:'3306'
  },
  // token加密密钥
  secretKey: 'abcdefg987654321',
  // 超时时间
  expireTime: 60*60*24*30,
  // 上传文件至本地的静态资源路径
  localUploadPath: 'static/local/'
}