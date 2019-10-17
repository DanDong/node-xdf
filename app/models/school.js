const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')
const {KnownError} = require('../../core/errors')

class School extends Model {
  // 新建校区
  static async add(sname){
    let haveOne = await School.findOne({
      where: {
        sname
      }
    })
    if(haveOne){
      throw new KnownError(10005)
    }
    await School.create({
      sname
    })
    return {
      msg: '校区新建成功'
    }
  }

  // 获取校区列表
  static async getList(){
    return await School.findAll({
      where: {
        status: 1
      }
    })
  }

  // 获取全部校区
  static async getListAll(){
    return await School.findAll()
  }

  // 重命名校区
  static async edit(sid, sname){
    await School.update({
      sname,
      updateTime: Date.now()
    },{
      where: {
        id: sid
      }
    })
    return {
      msg: '校区重命名成功'
    }
  }

  // 获取校区名称
  static async getName(sid){
    return await School.findOne({
      where: {
        id: sid
      }
    })
  }

  // 设置校区可见状态
  static async setSchoolStatus(id, status) {
    await School.update({
      status
    }, {
      where: {
        id
      }
    })
    return {
      msg: '设置成功'
    }
  }

  // 删除校区
  static async delete(id){
    await School.destroy({
      where: {
        id
      }
    })
    return {
      msg: '删除成功'
    }
  }
}

School.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sname: Sequelize.STRING,
  status: {
    type:Sequelize.INTEGER,
    defaultValue: 1    // 0-不统计 1-统计
  },
  createTime: {
    type:Sequelize.BIGINT(13),
    defaultValue: Date.now()
  },
  updateTime: Sequelize.BIGINT(13)
},{
  sequelize,
  tableName: 'school'
})

module.exports = {
  School
}