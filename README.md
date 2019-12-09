# Koa 源码解析
>koa是一个新的web框架，致力于成为web应用和API开发领域中的一个更小，更富有表现力、更健壮的基石。
>Koa是Express的下一代基于Node.js的web框架
>Koa2完全使用Promise并配合async实现异步
## 特点
>轻量，无捆绑
>中间件架构
>优雅的API设计
>增强的错误处理
## 安装
>npm i koa -S
## Koa中间件机制
>Koa中间件机制就是函数组合的概念，将一组需要书序执行的函数复合为一个函数，外层函数的参数实际就是内层函数的返回值
>洋葱圈模型可以形象表示这种机制，是源码中的精髓和难点
## 函数式编程
>允许把函数本身作为参数传入另一个函数，还允许返回一个函数 
```js
//同步
    const compose = (fn1,fn2)=>(...args)=>fn2(fn1(...args))
// 异步 shift+tab 实现整体的前进
// Promise.resolve() 无参 返回一个Resolved状态的Promise对象
// Promise.resolve(Promise对象) 直接返回这个Promise对象。
    function compose(middlewares){
        return function(){
            return dispatch(0)
            function dispatch(i){
                let fn = middlewares[i]
                if(!fn){
                    return Promise.resolve()
                }
                // 一个promise1对象resolve返回的是另一个Promise2对象，则 promise的状态受到promise2状态的限制
                // 只有p2resolve()了 p1才会继续执行
                return Promise.resolve(
                // 执行fn1的时候 传入一回调函数next() 在函数内部遇到执行next()时，遇到await就等待 并将fn1返回的Promise会被放入到回调队列中等待 又去执行另一个fn2
                // fn函数的返回值是一个Promise对象
                // async函数内部只要有一个异步过程发生错误，整个执行过程就中断，这个返回的Promise对象的catch就能抓取到这个错误
                // await 等到的是一个Promise对象，await就忙起来了，它会阻塞其后面的代码，等着Promise对象resolve，然后得到resolve的值
                // await只关心异步过程成功的消息resolve(data)，拿到相应的数据data，继续执行后续代码 至于失败消息reject(error)，不关心不处理
                    fn(function next(){
                        return dispatch(i+1)
                    })
                )
            }
        }
    }

```
