const http =require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class Kkoa{
    constructor(){
        this.middlewares=[]
    }
    listen(...args){
           const server = http.createServer(async (req,res)=>{
               //创建上下文环境
               const ctx =this.createContext(req,res);
               //    this.cb(ctx)
               const fn=this.compose(this.middlewares)
               await fn(ctx)
               res.end(ctx.body)//将body的值取出来
           })
           server.listen(...args)
    }
    // use(cb){
    //     this.cb = cb;

    // }
    use(middleware){
        this.middlewares.push(middleware)
    }
 compose(middlewares){
        return function(ctx){
            return dispatch(0)
            function dispatch(i){
                let fn = middlewares[i]
                if(!fn){
                    return Promise.resolve()
                }
                return Promise.resolve(
                    //先执行fn 当调用了next()后再执行下一次的回调函数
                    //一个promise1对象resolve返回的是另一个Promise2对象，则 promise的状态受到promise2状态的限制
                    //只有p2resolve()了 p1才会继续执行
                    fn(ctx,function next(){
                        return dispatch(i+1)
                    })
                )
            }
        }
    }
    
    createContext(req,res){
        /**
         * ctx:{
         *     response: response,
         *     request: request,
         *     req: 原生req
         *     res :原生res
         * }
         */
        const ctx = Object.create(context)//产生洁白的对象  
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req //原生的绑定到request像与ctx对象z中
        ctx.res = ctx.response.res = res
        return ctx
    }
}
module.exports= Kkoa