const Koa = require('koa')
const app = new Koa()

const router={}

router['/html'] = ctx=>{
             ctx.type ='html'
             ctx.body=`<h1>这是koa</h1>`
}



app.use(ctx=>{
    // if(ctx.url === '/html')
    //     {
    //         //  ctx.type ='text/html;charset=utf-8' 等同于 html
    //         ctx.type ='html'
    //          ctx.body=`<h1>这是koa</h1>`
    //     }   

    router[ctx.url](ctx)
})
app.listen(7000,()=>{
    console.log('服务器启动在7000端口')
})

