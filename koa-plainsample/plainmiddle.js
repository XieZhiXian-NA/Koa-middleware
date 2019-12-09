const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const route = new Router()

// app.use(ctx=>{
  
 //记得要next放行在事件及中间件
// })

app.use(require('koa-static')(__dirname+'/'))

app.use(route.routes())
app.listen(7000,()=>{
    console.log('服务器启动在7000端口')
})

