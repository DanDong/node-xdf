const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const InitManager = require('./core/init')
const catchError = require('./middleWare/catchError')

const app = new Koa()
app.use(bodyParser())
app.use(cors())
app.use(catchError)

InitManager.init(app)

app.listen(3040, ()=>{
  console.log('Serve run in 3040')
})