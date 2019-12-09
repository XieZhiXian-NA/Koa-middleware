// //将两个函数组合在一起
// const add = (x,y)=> x+y
// const square = z=>z*z

// const fn=(x,y)=>square(add(x,y))

// const compose = (fn1,fn2)=>(...args)=>fn2(fn1(...args))

// const fn = compose(add,square) //fn是一个函数 (...args){return fn2(fn1(...args))}

// const compose =(...[first,...other])=>(...args)=>{
//     let ret =first(...args)//第一个函数执行后的返回值
//     other.forEach(fn=>{
//         ret=fn(ret)//第2(3,4,5)函数执行后的返回值作为下一个函数的参数传进去
//     })
//     return ret//将所有函数执行完的结果返回
// }

// console.log(fn(1,2))

//异步函数

function compose(middlewares){
    return function(){
        return dispatch(0)
        function dispatch(i){
            let fn = middlewares[i]
            if(!fn){
                return Promise.resolve()
            }
            //一个promise1对象resolve返回的是另一个Promise2对象，则 promise的状态受到promise2状态的限制
            //只有p2resolve()了 p1才会继续执行
            return Promise.resolve(
                fn(function next(){
                    return dispatch(i+1)
                })
            )
        }
    }
}



async function fn1(next){
    console.log('fn1')
    await delay()
    await next()
    console.log('end fn1')
}
async function fn2(next){
    console.log('fn2')
    await delay()
    await next()
    console.log('end fn2')
}
async function fn3(next){
    console.log('fn3')
    
}

function delay(){
    return Promise.resolve(resolve=>{
        setTimeout(()=>{
            resolve()
        },2000)
    })
}

const middlewares = [fn1,fn2,fn3]
const finalFn = compose(middlewares)
finalFn()