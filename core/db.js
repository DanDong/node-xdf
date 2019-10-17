const Sequelize = require('sequelize')
const {
  dbname,
  host,
  user,
  password,
  port
} = require('../config/config').db

const sequelize = new Sequelize(dbname, user, password, {
  host,
  port,
  dialect: 'mysql',
  logging:false,
  timezone: '+08:00',
  define:{
    timestamps: false,
    freezeTableName:true
  }
})

sequelize.sync({
  force: false   // 千万别改，一改数据库数据全没了
})

module.exports = {
  sequelize
}