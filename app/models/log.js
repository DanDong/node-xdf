const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')
const {KnownError} = require('../../core/errors')

class Log extends Model {
  // 新建一条记录
  static async add(info){
    await Log.create({
      submitData: info
    })
    return {
      msg: '保存成功'
    }
  }

  // 获取最后一条记录
  static async getLast(){
    return await Log.findAll({
      order:[['id', 'DESC']],
      limit:1
    })
  }

}

Log.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  submitData: Sequelize.STRING(1024),
  createTime: {
    type:Sequelize.BIGINT(13),
    defaultValue: Date.now()
  }
},{
  sequelize,
  tableName: 'log'
})

module.exports = {
  Log
}