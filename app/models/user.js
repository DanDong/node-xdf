const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')
const {KnownError} = require('../../core/errors')
const {getToken} = require('../../core/util')
const {School} = require('./school')

class User extends Model {
  // 手机号注册
  static async register(uname, password, phone, sid){
    let haveOne = await User.findOne({
      where: {
        phone
      }
    })
    if(haveOne){
      throw new KnownError(10003)
    } else {
      let result = await User.create({
        uname,
        password,
        phone,
        sid
      })
      return {
        msg: '注册成功',
        uid: result.id,
        uname: result.uname,
        phone: result.phone,
        sid: result.sid,
        type: result.type
      }
    }
  }

  // 手机号登录
  static async login(phone, password){
    let haveOne = await User.findOne({
      where: {
        phone
      }
    })
    if(haveOne){
      if (password === haveOne.password) {
        // 生成token
        let token = getToken(haveOne.id, haveOne.type)
        return {
          msg: '登录成功',
          uid: haveOne.id,
          uname: haveOne.uname,
          phone: haveOne.phone,
          type: haveOne.type,
          token
        }
      } else {
        throw new KnownError(10001)
      }
    } else {
      throw new KnownError(10002)
    }
  }

  // 修改密码
  static async updatePassword(id, oldpassword, password){
    let haveOne = await User.findOne({
      where: {
        id
      }
    })
    if(haveOne){
      if (oldpassword === haveOne.password) {
        await User.update({
          password
        }, {
          where: {
            id
          }
        })
        return {
          msg:'密码修改成功'
        }
      } else {
        throw new KnownError(10004)
      }
    } else {
      throw new KnownError(10002)
    }
  }

  // 重置密码
  static async resetPassword(phone, password){
    let haveOne = await User.findOne({
      where: {
        phone
      }
    })
    if(haveOne){
      await User.update({
        password
      }, {
        where: {
          id: haveOne.id
        }
      })
      return {
        msg:'密码重置成功'
      }
    } else {
      throw new KnownError(10002)
    }
  }

  // 修改用户名
  static async updateUname(id, uname){
    await User.update({
      uname
    }, {
      where: {
        id
      }
    })
    return {
      msg:'用户名修改成功'
    }
  }

  // 修改手机号
  static async updatePhone(id, phone){
    await User.update({
      phone
    }, {
      where: {
        id
      }
    })
    return {
      msg:'手机号修改成功'
    }
  }

  // 获取某个校区的所有数据
  static async getSchool(sid){
    return await User.findAll({
      where: {
        sid
      }
    })
  }

  // 更新用户所属校区
  static async updateSchool(id, sid){
    await User.update({
      sid
    }, {
      where: {
        id
      }
    })
    return {
      msg: '更新成功'
    }
  }

  // 更新用户的当前课时
  static async updateCurrent(id, num){
    await User.update({
      current: num,
      updateTime: Date.now()
    }, {
      where: {
        id
      }
    })
    return {
      msg: '当前课时更新成功'
    }
  }

  // 更新用户的总课时
  static async updateTotal(id, num){
    await User.update({
      total: num
    }, {
      where: {
        id
      }
    })
    return {
      msg: '课标更新成功'
    }
  }

  // 查询用户信息
  static async getInfo(id){
    let result = await User.findOne({
      where: {
        id
      }
    })
    let shcoolInfo = await School.getName(result.sid)
    return {
      uid: result.id,
      uname: result.uname,
      phone: result.phone,
      sid: result.sid,
      sname: shcoolInfo.sname,
      total: result.total,
      current: result.current,
      type: result.type,
      updateTime: result.updateTime
    }
  }

  // 获取用户列表
  static async getUserList(){
    return await User.findAll({
      attributes: ['id', 'uname', 'sid', Sequelize.col('school.sname'), 'total', 'current', 'updateTime'],
      include: [{
        model: School,
        as: 'school',
        attributes: []
      }],
      raw:true,
      where: {
        status: 1
      }
    })
  }
  
  // 获取全部用户
  static async getUserListAll() {
    return await User.findAll()
  }
  
  // 设置用户可见状态
  static async setUserStatus(id, status) {
    await User.update({
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
}


User.init({
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  uname: {
    type: Sequelize.STRING,
    defaultValue: '新东方' + Math.floor(Math.random()*1000)
  },
  phone: {
    type: Sequelize.STRING(32),
    unique: true
  },
  password: Sequelize.STRING,
  sid: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 60
  },
  current: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  type: {
    type:Sequelize.INTEGER,
    defaultValue: 1      // 1-普通用户 2-会员 3-管理员
  },
  status: {
    type:Sequelize.INTEGER,
    defaultValue: 0      // 0-不统计 1-统计
  },
  createTime: {
    type:Sequelize.BIGINT(13),
    defaultValue: Date.now()
  },
  updateTime: Sequelize.BIGINT(13)
}, {
  sequelize,
  tableName: 'user'
})

User.belongsTo(School, { foreignKey: 'sid', as: 'school'})

module.exports = {
  User
}