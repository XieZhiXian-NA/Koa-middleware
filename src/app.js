const Kkoa= require('./kkoa')
const static = require('./static')
const Router = require('./router')
const router = new Router()

const app = new Kkoa()

// app.use(async (ctx,next)=>{
//     ctx.body = '1' //设置body值
//     await next() //使用compose函数编程 将多个函数编写为一个函数 
//     ctx.body += '2' //设置body值
// })

// app.use(async (ctx,next)=>{
//     ctx.body +='3'  //设置body值
//     await next()
//     ctx.body +='4'  //设置body值
// })
// app.use(async (ctx,next)=>{
//     ctx.body +='5'  //设置body值
//     await next()
   
// })

router.get('/index',async ctx=>{
    ctx.body = 'get rindex page'
})
router.post('/html',async ctx =>{
    ctx.body='post html page'
})
app.use(static(__dirname+'/public'))
app.use(router.routes())

app.listen(3000,()=>{
    console.log('服务器启动在3000端口')

})